"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import RouteForm from "@/modules/routes/RouteForm";
import RouteTable from "@/modules/routes/RouteTable";

import { getRoutes } from "@/modules/routes/route.service";
import { Route } from "@/modules/routes/route.types";


export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadRoutes() {
    try {
      setLoading(true);
      const data = await getRoutes();
      setRoutes(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load routes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Route Master"
        description="Manage transport routes"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <div>
          <RouteForm onSaved={loadRoutes} />
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Routes ({routes.length})
            </h2>
          </div>

          {loading ? (
            <div className="rounded-lg border bg-white p-8 text-center">
              Loading...
            </div>
          ) : (
            <RouteTable routes={routes} />
          )}
        </div>
      </div>
    </div>
  );
}

