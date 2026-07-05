

"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import TicketIssueForm from "@/modules/ticket-issue/TicketIssueForm";
import TicketIssueTable from "@/modules/ticket-issue/TicketIssueTable";

import { getTicketIssues } from "@/modules/ticket-issue/ticketIssue.service";

import { TicketIssue } from "@/modules/ticket-issue/ticketIssue.types";

import toast from "react-hot-toast";

export default function TicketIssuePage() {
  const [issues, setIssues] = useState<TicketIssue[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadIssues() {
    try {
      setLoading(true);

      const data = await getTicketIssues();

      setIssues(data);
    } catch (error) {
      toast.error("Failed to load issues");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <div className="space-y-6">

      <PageHeader
        title="Ticket Issue"
        description="Issue Tickets To Supervisors"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div>
          <TicketIssueForm
            onSaved={loadIssues}
          />
        </div>

        <div className="lg:col-span-2">

          <div className="mb-3">
            <h2 className="text-xl font-semibold">
              Ticket Issues ({issues.length})
            </h2>
          </div>

          {loading ? (
            <div className="rounded border bg-white p-8 text-center">
              Loading...
            </div>
          ) : (
            <TicketIssueTable
              issues={issues}
            />
          )}

        </div>

      </div>

    </div>
  );
}

