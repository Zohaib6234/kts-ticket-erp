"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import DepotForm from "@/modules/depots/DepotForm";
import DepotTable from "@/modules/depots/DepotTable";

import { Depot } from "@/modules/depots/depot.types";
import { getDepots } from "@/modules/depots/depot.service";

export default function DepotsPage() {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadDepots() {
    try {
      setLoading(true);

      const data = await getDepots();

      setDepots(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDepots();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Depot Master"
        description="Manage transport depots"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <DepotForm onSaved={loadDepots} />
        </div>

        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Depots ({depots.length})
            </h2>
          </div>

          {loading ? (
            <div className="rounded-lg border bg-white p-8 text-center">
              Loading...
            </div>
          ) : (
            <DepotTable depots={depots} />
          )}
        </div>
      </div>
    </div>
  );
}

