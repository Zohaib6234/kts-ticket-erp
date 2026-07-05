

"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";

import { createTicketCategory } from "./ticketCategory.service";

type Props = {
  onSaved: () => void;
};

export default function TicketCategoryForm({
  onSaved,
}: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      await createTicketCategory({
        name,
        amount: Number(amount),
      });

      setName("");
      setAmount("");

      toast.success("Ticket Category saved successfully.");

      onSaved();
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
          label="Category Name"
          value={name}
          onChange={setName}
          required
        />

        <TextInput
          label="Ticket Amount"
          type="number"
          value={amount}
          onChange={setAmount}
          required
        />

      </div>

      <div className="mt-5">
        <PrimaryButton onClick={handleSave}>
          {loading ? "Saving..." : "Save Category"}
        </PrimaryButton>
      </div>

    </div>
  );
}

