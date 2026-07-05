

"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import TicketClosingForm from "@/modules/ticket-closing/TicketClosingForm";
import TicketClosingTable from "@/modules/ticket-closing/TicketClosingTable";

import {
  getTicketClosings,
} from "@/modules/ticket-closing/ticketClosing.service";

import {
  TicketClosing,
} from "@/modules/ticket-closing/ticketClosing.types";

import toast from "react-hot-toast";

export default function TicketClosingPage() {
  const [closings, setClosings] = useState<TicketClosing[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadClosings() {
    try {
      setLoading(true);

      const data = await getTicketClosings();

      setClosings(data);
    } catch {
      toast.error("Failed to load closing records");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClosings();
  }, []);

  return (
    <div className="space-y-6">

      <PageHeader
        title="Ticket Closing"
        description="Daily Supervisor Closing"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div>
          <TicketClosingForm
            onSaved={loadClosings}
          />
        </div>

        <div className="lg:col-span-2">

          <div className="mb-3">
            <h2 className="text-xl font-semibold">
              Closing Records ({closings.length})
            </h2>
          </div>

          {loading ? (
            <div className="rounded-lg border bg-white p-8 text-center">
              Loading...
            </div>
          ) : (
            <TicketClosingTable
              closings={closings}
            />
          )}

        </div>

      </div>

    </div>
  );
}

