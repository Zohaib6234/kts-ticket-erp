

"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import SupervisorForm from "@/modules/supervisors/SupervisorForm";
import SupervisorTable from "@/modules/supervisors/SupervisorTable";

import { Supervisor } from "@/modules/supervisors/supervisor.types";
import { getSupervisors } from "@/modules/supervisors/supervisor.service";

export default function SupervisorsPage() {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSupervisors() {
    try {
      setLoading(true);

      const data = await getSupervisors();

      setSupervisors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSupervisors();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Supervisor Master"
        description="Manage Supervisors"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <SupervisorForm onSaved={loadSupervisors} />
        </div>

        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Supervisors ({supervisors.length})
            </h2>
          </div>

          {loading ? (
            <div className="rounded-lg border bg-white p-8 text-center">
              Loading...
            </div>
          ) : (
            <SupervisorTable supervisors={supervisors} />
          )}
        </div>
      </div>
    </div>
  );
}

