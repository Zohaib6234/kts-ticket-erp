
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";

import { createDepot } from "./depot.service";

type Props = {
  onSaved: () => void;
};

export default function DepotForm({ onSaved }: Props) {
  const [depotCode, setDepotCode] = useState("");
  const [depotName, setDepotName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!depotCode.trim() || !depotName.trim()) {
      toast.error("Depot Code and Depot Name are required.");
      return;
    }

    try {
      setLoading(true);

      await createDepot({
        depotCode,
        depotName,
      });

      toast.success("Depot saved successfully.");

      setDepotCode("");
      setDepotName("");

      onSaved();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-5">

      <div className="space-y-4">

        <TextInput
          label="Depot Code"
          value={depotCode}
          onChange={setDepotCode}
          placeholder="D001"
          required
        />

        <TextInput
          label="Depot Name"
          value={depotName}
          onChange={setDepotName}
          placeholder="Korangi Depot"
          required
        />

      </div>

      <div className="mt-5">
        <PrimaryButton onClick={handleSave}>
          {loading ? "Saving..." : "Save Depot"}
        </PrimaryButton>
      </div>

    </div>
  );
}

