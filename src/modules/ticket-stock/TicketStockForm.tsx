"use client";

import { useEffect, useState } from "react";
import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";

import { getDepots } from "@/modules/depots/depot.service";
import {
  createTicketStock,
  updateTicketStock,
} from "./ticketStock.service";

import toast from "react-hot-toast";

type Depot = {
  id: string;
  depotCode: string;
  depotName: string;
};

type TicketCategory = {
  id: string;
  name: string;
};

type Props = {
  onSaved: () => void;
  editData?: any; // 👈 edit mode support
  onCancelEdit?: () => void;
};

export default function TicketStockForm({
  onSaved,
  editData,
  onCancelEdit,
}: Props) {
  const isEdit = !!editData;

  const [depots, setDepots] = useState<Depot[]>([]);
  const [categories, setCategories] = useState<TicketCategory[]>([]);

  const [vendor, setVendor] = useState("");
  const [depotId, setDepotId] = useState("");
  const [ticketCategoryId, setTicketCategoryId] = useState("");

  const [startingSerial, setStartingSerial] = useState("");
  const [endingSerial, setEndingSerial] = useState("");

  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // Load dropdowns
  // =========================
  useEffect(() => {
    loadDepots();
    loadCategories();
  }, []);

  async function loadDepots() {
    try {
      const data = await getDepots();
      setDepots(data);
    } catch {
      toast.error("Failed to load depots");
    }
  }

  async function loadCategories() {
    try {
      const res = await fetch("/api/ticket-categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  }

  // =========================
  // Fill form when editing
  // =========================
  useEffect(() => {
    if (editData) {
      setVendor(editData.vendor || "");
      setDepotId(editData.depotId || "");
      setTicketCategoryId(editData.ticketCategoryId || "");
      setStartingSerial(String(editData.startingSerial || ""));
      setEndingSerial(String(editData.endingSerial || ""));
      setRemarks(editData.remarks || "");
    }
  }, [editData]);

  const quantity =
    startingSerial && endingSerial
      ? Number(endingSerial) - Number(startingSerial) + 1
      : 0;

  // =========================
  // Save / Update
  // =========================
  async function handleSave() {
    try {
      setLoading(true);

      const payload = {
        vendor,
        depotId,
        ticketCategoryId,
        startingSerial: Number(startingSerial),
        endingSerial: Number(endingSerial),
        remarks,
      };

      if (isEdit) {
        await updateTicketStock(editData.id, payload);
        toast.success("Ticket Stock Updated");
      } else {
        await createTicketStock(payload);
        toast.success("Ticket Stock Saved");
      }

      // reset form
      setVendor("");
      setDepotId("");
      setTicketCategoryId("");
      setStartingSerial("");
      setEndingSerial("");
      setRemarks("");

      onSaved();
      onCancelEdit?.();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-5 space-y-4">

      <TextInput
        label="Vendor"
        value={vendor}
        onChange={setVendor}
      />

      <div>
        <label className="block mb-1">Depot</label>
        <select
          value={depotId}
          onChange={(e) => setDepotId(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">Select Depot</option>
          {depots.map((d) => (
            <option key={d.id} value={d.id}>
              {d.depotName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Category</label>
        <select
          value={ticketCategoryId}
          onChange={(e) =>
            setTicketCategoryId(e.target.value)
          }
          className="w-full rounded border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        label="Starting Serial"
        type="number"
        value={startingSerial}
        onChange={setStartingSerial}
      />

      <TextInput
        label="Ending Serial"
        type="number"
        value={endingSerial}
        onChange={setEndingSerial}
      />

      <TextInput
        label="Quantity"
        value={quantity.toString()}
        onChange={() => {}}
      />

      <TextInput
        label="Remarks"
        value={remarks}
        onChange={setRemarks}
      />

      <div className="flex gap-2">
        <PrimaryButton onClick={handleSave}>
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Stock"
            : "Save Stock"}
        </PrimaryButton>

        {isEdit && (
          <button
            onClick={onCancelEdit}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

