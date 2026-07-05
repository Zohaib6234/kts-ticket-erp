
"use client";

import { useEffect, useMemo, useState } from "react";

import TextInput from "@/components/common/TextInput";
import PrimaryButton from "@/components/common/PrimaryButton";

import { createTicketClosing } from "./ticketClosing.service";

import toast from "react-hot-toast";

type Issue = {
  id: string;
  quantity: number;

  supervisorId: string;
  supervisor: {
    supervisorName: string;
  };

  ticketCategoryId: string;
  ticketCategory: {
    name: string;
    amount: number;
  };
};

type Props = {
  onSaved: () => void;
};

export default function TicketClosingForm({
  onSaved,
}: Props) {
  const [issues, setIssues] = useState<Issue[]>([]);

  const [issueId, setIssueId] = useState("");

  const [soldQuantity, setSoldQuantity] = useState("");

  const [returnedQuantity, setReturnedQuantity] = useState("");

  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadIssues();
  }, []);

  async function loadIssues() {
    try {
      const res = await fetch("/api/ticket-issue");

      const data = await res.json();

      setIssues(data);
    } catch {
      toast.error("Failed to load issues");
    }
  }

  const selectedIssue = useMemo(() => {
    return issues.find((x) => x.id === issueId);
  }, [issues, issueId]);

  const issuedQuantity = selectedIssue?.quantity ?? 0;

  const missingQuantity =
    issuedQuantity -
    Number(soldQuantity || 0) -
    Number(returnedQuantity || 0);

  const totalAmount =
    Number(selectedIssue?.ticketCategory.amount ?? 0) *
    Number(soldQuantity || 0);

  async function handleSave() {
    if (!selectedIssue) {
      toast.error("Select an Issue");
      return;
    }

    try {
      setLoading(true);

      await createTicketClosing({
        issueId,

        supervisorId:
          selectedIssue.supervisorId,

        ticketCategoryId:
          selectedIssue.ticketCategoryId,

        soldQuantity: Number(soldQuantity),

        returnedQuantity: Number(
          returnedQuantity
        ),

        remarks,
      });

      toast.success("Closing Saved");

      setIssueId("");
      setSoldQuantity("");
      setReturnedQuantity("");
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
        <label className="mb-1 block">
          Ticket Issue
        </label>

        <select
          value={issueId}
          onChange={(e) =>
            setIssueId(e.target.value)
          }
          className="w-full rounded border p-2"
        >
          <option value="">
            Select Issue
          </option>

          {issues.map((issue) => (
            <option
              key={issue.id}
              value={issue.id}
            >
              {issue.supervisor.supervisorName} -{" "}
              {issue.ticketCategory.name}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        label="Issued Quantity"
        value={issuedQuantity.toString()}
        onChange={() => {}}
      />

      <TextInput
        label="Sold Quantity"
        type="number"
        value={soldQuantity}
        onChange={setSoldQuantity}
      />

      <TextInput
        label="Returned Quantity"
        type="number"
        value={returnedQuantity}
        onChange={setReturnedQuantity}
      />

      <TextInput
        label="Missing Quantity"
        value={missingQuantity.toString()}
        onChange={() => {}}
      />

      <TextInput
        label="Total Amount"
        value={totalAmount.toString()}
        onChange={() => {}}
      />

      <TextInput
        label="Remarks"
        value={remarks}
        onChange={setRemarks}
      />

      <PrimaryButton onClick={handleSave}>
        {loading
          ? "Saving..."
          : "Save Closing"}
      </PrimaryButton>
    </div>
  );
}

