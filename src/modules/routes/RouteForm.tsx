"use client";

import { useEffect, useState } from "react";

import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";

import { createRoute } from "./route.service";
import { getDepots } from "@/modules/depots/depot.service";

import toast from "react-hot-toast";

type Depot = {
  id: string;
  depotCode: string;
  depotName: string;
};

type Props = {
  onSaved: () => void;
};

export default function RouteForm({ onSaved }: Props) {
  const [depots, setDepots] = useState<Depot[]>([]);

  const [depotId, setDepotId] = useState("");

  const [routeNo, setRouteNo] = useState("");

  const [routeName, setRouteName] = useState("");

  const [routeDetail, setRouteDetail] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepots();
  }, []);

  async function loadDepots() {
    try {
      const data = await getDepots();
      setDepots(data);
    } catch {
      toast.error("Failed to load depots.");
    }
  }

  useEffect(() => {
    if (routeNo) {
      setRouteName(`R-${routeNo}`);
    } else {
      setRouteName("");
    }
  }, [routeNo]);

  async function handleSave() {
    try {
      if (!depotId) {
        toast.error("Please select depot.");
        return;
      }

      setLoading(true);

      await createRoute({
        depotId,
        routeNo: Number(routeNo),
        routeName,
        description: routeDetail,
      });

      setDepotId("");
      setRouteNo("");
      setRouteName("");
      setRouteDetail("");

      onSaved();

      toast.success("Route saved successfully.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-5">

      <div className="grid gap-4">

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
              <option
                key={depot.id}
                value={depot.id}
              >
                {depot.depotCode} - {depot.depotName}
              </option>
            ))}
          </select>

        </div>

        <TextInput
          label="Route No"
          type="number"
          value={routeNo}
          onChange={setRouteNo}
          required
        />

        <TextInput
          label="Route Name"
          value={routeName}
          onChange={setRouteName}
          required
        />

        <TextInput
          label="Route Detail"
          value={routeDetail}
          onChange={setRouteDetail}
        />

      </div>

      <div className="mt-5">
        <PrimaryButton onClick={handleSave}>
          {loading ? "Saving..." : "Save Route"}
        </PrimaryButton>
      </div>

    </div>
  );
}
