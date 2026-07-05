

"use client";

import { useEffect, useState } from "react";

import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";

import { getDepots } from "@/modules/depots/depot.service";
import { getRoutes } from "@/modules/routes/route.service";

import { createSupervisor } from "./supervisor.service";

import toast from "react-hot-toast";

type Depot = {
  id: string;
  depotCode: string;
  depotName: string;
};

type Route = {
  id: string;
  routeNo: number;
  routeName: string;
};

type Props = {
  onSaved: () => void;
};

export default function SupervisorForm({ onSaved }: Props) {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  const [supervisorCode, setSupervisorCode] = useState("");
  const [supervisorName, setSupervisorName] = useState("");

  const [depotId, setDepotId] = useState("");
  const [routeId, setRouteId] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepots();
    loadRoutes();
  }, []);

  async function loadDepots() {
    try {
      const data = await getDepots();
      setDepots(data);
    } catch {
      toast.error("Failed to load depots.");
    }
  }

  async function loadRoutes() {
    try {
      const data = await getRoutes();
      setRoutes(data);
    } catch {
      toast.error("Failed to load routes.");
    }
  }

  async function handleSave() {
    if (
      !supervisorCode ||
      !supervisorName ||
      !depotId ||
      !routeId
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await createSupervisor({
        supervisorCode,
        supervisorName,
        depotId,
        routeId,
      });

      setSupervisorCode("");
      setSupervisorName("");
      setDepotId("");
      setRouteId("");

      toast.success("Supervisor saved successfully.");

      onSaved();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-5">

      <div className="grid gap-4">

        <TextInput
          label="Supervisor Code"
          value={supervisorCode}
          onChange={setSupervisorCode}
          required
        />

        <TextInput
          label="Supervisor Name"
          value={supervisorName}
          onChange={setSupervisorName}
          required
        />

        <div>
          <label className="mb-1 block text-sm font-medium">
            Depot
          </label>

          <select
            value={depotId}
            onChange={(e) => setDepotId(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Depot</option>

            {depots.map((depot) => (
              <option key={depot.id} value={depot.id}>
                {depot.depotCode} - {depot.depotName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Route
          </label>

          <select
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Route</option>

            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.routeNo} - {route.routeName}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="mt-5">
        <PrimaryButton onClick={handleSave}>
          {loading ? "Saving..." : "Save Supervisor"}
        </PrimaryButton>
      </div>

    </div>
  );
}

