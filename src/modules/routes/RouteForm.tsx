

"use client";

import { useEffect, useState } from "react";
import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import { createRoute } from "./route.service";
import toast from "react-hot-toast";





type Props = {
  onSaved: () => void;
};

export default function RouteForm({ onSaved }: Props) {
  const [routeNo, setRouteNo] = useState("");
  const [routeName, setRouteName] = useState("");
  const [routeDetail, setRouteDetail] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto generate Route Name
  useEffect(() => {
    if (routeNo) {
      setRouteName(`R-${routeNo}`);
    } else {
      setRouteName("");
    }
  }, [routeNo]);

  async function handleSave() {
    try {
      setLoading(true);

      await createRoute({
        routeNo: Number(routeNo),
        routeName,
        description: routeDetail,
      });

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

      <div className="grid grid-cols-1 gap-4">

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
        <PrimaryButton
          onClick={handleSave}
        >
          {loading ? "Saving..." : "Save Route"}
        </PrimaryButton>
      </div>

    </div>
  );
}

