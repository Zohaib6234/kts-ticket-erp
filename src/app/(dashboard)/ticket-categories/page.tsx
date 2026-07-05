"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import TicketCategoryForm from "@/modules/ticket-categories/TicketCategoryForm";
import TicketCategoryTable from "@/modules/ticket-categories/TicketCategoryTable";

import {
  getTicketCategories,
} from "@/modules/ticket-categories/ticketCategory.service";

import {
  TicketCategory,
} from "@/modules/ticket-categories/ticketCategory.types";

export default function TicketCategoriesPage() {
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    try {
      setLoading(true);

      const data = await getTicketCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="space-y-6">

      <PageHeader
        title="Ticket Categories"
        description="Manage Ticket Categories"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div>
          <TicketCategoryForm
            onSaved={loadCategories}
          />
        </div>

        <div className="lg:col-span-2">

          <div className="mb-3 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Categories ({categories.length})
            </h2>

          </div>

          {loading ? (
            <div className="rounded-lg border bg-white p-8 text-center">
              Loading...
            </div>
          ) : (
            <TicketCategoryTable
              categories={categories}
            />
          )}

        </div>

      </div>

    </div>
  );
}

