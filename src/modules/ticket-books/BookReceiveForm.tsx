

"use client";

import { useEffect, useState } from "react";

import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";

import { getDepots } from "@/modules/depots/depot.service";
import { receiveBooks } from "./book.service";

import toast from "react-hot-toast";

type Depot = {
  id: string;
  depotName: string;
};

type TicketCategory = {
  id: string;
  name: string;
};

type Props = {
  onSaved: () => void;
};

export default function BookReceiveForm({
  onSaved,
}: Props) {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [categories, setCategories] = useState<TicketCategory[]>([]);

  const [vendor, setVendor] = useState("");
  const [depotId, setDepotId] = useState("");
  const [ticketCategoryId, setTicketCategoryId] = useState("");

  const [startSerial, setStartSerial] = useState("");
  const [endSerial, setEndSerial] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepots();
    loadCategories();
  }, []);

  async function loadDepots() {
    const data = await getDepots();
    setDepots(data);
  }

  async function loadCategories() {
    const res = await fetch("/api/ticket-categories");
    const data = await res.json();
    setCategories(data);
  }

  async function handleSave() {
    try {
      setLoading(true);

      await receiveBooks({
        vendor,
        depotId,
        ticketCategoryId,
        startSerial: Number(startSerial),
        endSerial: Number(endSerial),
      });

      toast.success("Books Received Successfully");

      setVendor("");
      setDepotId("");
      setTicketCategoryId("");
      setStartSerial("");
      setEndSerial("");

      onSaved();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const totalBooks =
    startSerial && endSerial
      ? Math.floor(
          (Number(endSerial) - Number(startSerial)) / 100
        ) + 1
      : 0;

  return (
    <div className="rounded-lg border bg-white p-5 space-y-4">

      <TextInput
        label="Vendor"
        value={vendor}
        onChange={setVendor}
      />

      <div>
        <label className="mb-1 block">
          Depot
        </label>

        <select
          value={depotId}
          onChange={(e) => setDepotId(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">
            Select Depot
          </option>

          {depots.map((d) => (
            <option
              key={d.id}
              value={d.id}
            >
              {d.depotName}
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
            <option
              key={c.id}
              value={c.id}
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        label="First Book First Serial"
        type="number"
        value={startSerial}
        onChange={setStartSerial}
      />

      <TextInput
        label="Last Book First Serial"
        type="number"
        value={endSerial}
        onChange={setEndSerial}
      />

      <TextInput
        label="Total Books"
        value={totalBooks.toString()}
        onChange={() => {}}
      />

      <PrimaryButton onClick={handleSave}>
        {loading ? "Saving..." : "Receive Books"}
      </PrimaryButton>

    </div>
  );
}

