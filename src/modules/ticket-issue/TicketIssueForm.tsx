

"use client";

import { useEffect, useState } from "react";

import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";

import { getDepots } from "@/modules/depots/depot.service";
import { createTicketIssue } from "./ticketIssue.service";

import toast from "react-hot-toast";

type Depot = {
  id: string;
  depotName: string;
};

type Supervisor = {
  id: string;
  supervisorName: string;
};

type TicketCategory = {
  id: string;
  name: string;
};

type Props = {
  onSaved: () => void;
};

export default function TicketIssueForm({
  onSaved,
}: Props) {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [categories, setCategories] = useState<TicketCategory[]>([]);

  const [depotId, setDepotId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [ticketCategoryId, setTicketCategoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepots();
    loadSupervisors();
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

  async function loadSupervisors() {
    try {
      const res = await fetch("/api/supervisors");
      const data = await res.json();
      setSupervisors(data);
    } catch {
      toast.error("Failed to load supervisors");
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

  async function handleSave() {
    try {
      setLoading(true);

      await createTicketIssue({
        depotId,
        supervisorId,
        ticketCategoryId,
        quantity: Number(quantity),
        remarks,
      });

      toast.success("Ticket Issued Successfully");

      setDepotId("");
      setSupervisorId("");
      setTicketCategoryId("");
      setQuantity("");
      setRemarks("");

      onSaved();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-5 space-y-4">

      <div>
        <label className="mb-1 block">Depot</label>

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
        <label className="mb-1 block">Supervisor</label>

        <select
          value={supervisorId}
          onChange={(e) => setSupervisorId(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">Select Supervisor</option>

          {supervisors.map((s) => (
            <option key={s.id} value={s.id}>
              {s.supervisorName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block">
          Ticket Category
        </label>

        <select
          value={ticketCategoryId}
          onChange={(e) =>
            setTicketCategoryId(e.target.value)
          }
          className="w-full rounded border p-2"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        label="Quantity"
        type="number"
        value={quantity}
        onChange={setQuantity}
      />

      <TextInput
        label="Remarks"
        value={remarks}
        onChange={setRemarks}
      />

      <PrimaryButton onClick={handleSave}>
        {loading ? "Issuing..." : "Issue Tickets"}
      </PrimaryButton>

    </div>
  );
}

