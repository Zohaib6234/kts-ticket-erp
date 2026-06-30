

"use client";

import { Route } from "./route.types";

type Props = {
  routes: Route[];
};

export default function RouteTable({ routes }: Props) {
  return (
    <div className="rounded-lg border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Route No</th>
            <th className="p-3 text-left">Route Name</th>
            <th className="p-3 text-left">Route Detail</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {routes.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No Routes Found
              </td>
            </tr>
          ) : (
            routes.map((route) => (
              <tr key={route.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{route.routeNo}</td>
                <td className="p-3">{route.routeName}</td>
                <td className="p-3">{route.description}</td>
                <td className="p-3 text-center">
                  {route.isActive ? "Active" : "Inactive"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

