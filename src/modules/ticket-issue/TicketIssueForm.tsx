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
  depotId: string;
};

type Props = {
  onSaved: () => void;
};

export default function TicketIssueForm({
  onSaved,
}: Props) {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  const [depotId, setDepotId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");

  const [firstSerial, setFirstSerial] = useState("");
  const [lastSerial, setLastSerial] = useState("");

  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepots();
    loadSupervisors();
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

  const filteredSupervisors = supervisors.filter(
    (x) => x.depotId === depotId
  );

  async function handleSave() {
    if (!depotId) {
      toast.error("Select Depot");
      return;
    }

    if (!supervisorId) {
      toast.error("Select Supervisor");
      return;
    }

    if (!firstSerial) {
      toast.error("Enter First Book First Serial");
      return;
    }

    if (!lastSerial) {
      toast.error("Enter Last Book First Serial");
      return;
    }

    try {
      setLoading(true);

      await createTicketIssue({
        depotId,
        supervisorId,
        firstSerial: Number(firstSerial),
        lastSerial: Number(lastSerial),
        remarks,
      });

      toast.success("Books Issued Successfully");

      setDepotId("");
      setSupervisorId("");
      setFirstSerial("");
      setLastSerial("");
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
          Depot
        </label>

        <select
          className="w-full rounded border p-2"
          value={depotId}
          onChange={(e) => setDepotId(e.target.value)}
        >
          <option value="">
            Select Depot
          </option>

          {depots.map((d) => (
            <option key={d.id} value={d.id}>
              {d.depotName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block">
          Supervisor
        </label>

        <select
          className="w-full rounded border p-2"
          value={supervisorId}
          onChange={(e) =>
            setSupervisorId(e.target.value)
          }
        >
          <option value="">
            Select Supervisor
          </option>

          {filteredSupervisors.map((s) => (
            <option key={s.id} value={s.id}>
              {s.supervisorName}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        label="First Book First Serial"
        type="number"
        value={firstSerial}
        onChange={setFirstSerial}
      />

      <TextInput
        label="Last Book First Serial"
        type="number"
        value={lastSerial}
        onChange={setLastSerial}
      />

      <TextInput
        label="Remarks"
        value={remarks}
        onChange={setRemarks}
      />

      <PrimaryButton onClick={handleSave}>
        {loading
          ? "Issuing..."
          : "Issue Books"}
      </PrimaryButton>

    </div>
  );
}
