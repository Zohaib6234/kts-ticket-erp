

import {
  Supervisor,
  SupervisorFormData,
} from "./supervisor.types";

const API = "/api/supervisors";

export async function getSupervisors(): Promise<Supervisor[]> {
  const res = await fetch(API, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch supervisors.");
  }

  return res.json();
}

export async function createSupervisor(
  data: SupervisorFormData
): Promise<Supervisor> {
  const res = await fetch(API, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function updateSupervisor(
  id: string,
  data: SupervisorFormData
): Promise<Supervisor> {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function deleteSupervisor(
  id: string
): Promise<void> {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const result = await res.json();

    throw new Error(result.message);
  }
}

