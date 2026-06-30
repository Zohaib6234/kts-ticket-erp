
import { Route, RouteFormData } from "./route.types";

export async function getRoutes(): Promise<Route[]> {
  const res = await fetch("/api/routes", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch routes");
  }

  return res.json();
}

export async function createRoute(data: RouteFormData) {
  const res = await fetch("/api/routes", {
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

