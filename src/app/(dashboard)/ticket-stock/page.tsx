"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import TicketStockForm from "@/modules/ticket-stock/TicketStockForm";
import TicketStockTable from "@/modules/ticket-stock/TicketStockTable";

import {
  getTicketStocks,
  deleteTicketStock,
} from "@/modules/ticket-stock/ticketStock.service";

import { TicketStock } from "@/modules/ticket-stock/ticketStock.types";

import toast from "react-hot-toast";

export default function TicketStockPage() {
  const [stocks, setStocks] = useState<TicketStock[]>([]);
  const [loading, setLoading] = useState(true);

  const [editData, setEditData] = useState<TicketStock | null>(null);

  // =========================
  // Load Data
  // =========================
  async function loadStocks() {
    try {
      setLoading(true);

      const data = await getTicketStocks();
      setStocks(data);
    } catch (error) {
      toast.error("Failed to load ticket stock");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStocks();
  }, []);

  // =========================
  // Delete
  // =========================
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await deleteTicketStock(id);
      toast.success("Deleted successfully");
      loadStocks();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Ticket Stock"
        description="Manage Ticket Inventory"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* FORM */}
        <div>
          <TicketStockForm
            onSaved={loadStocks}
            editData={editData}
            onCancelEdit={() => setEditData(null)}
          />
        </div>

        {/* TABLE */}
        <div className="lg:col-span-2">

          <div className="mb-3">
            <h2 className="text-xl font-semibold">
              Ticket Stock ({stocks.length})
            </h2>
          </div>

          {loading ? (
            <div className="rounded border p-6">
              Loading...
            </div>
          ) : (
            <TicketStockTable
              stocks={stocks}
              onEdit={(item: TicketStock) =>
                setEditData(item)
              }
              onDelete={handleDelete}
            />
          )}

        </div>

      </div>
    </div>
  );
}
