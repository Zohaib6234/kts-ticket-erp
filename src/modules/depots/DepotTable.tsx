
"use client";

import { Depot } from "./depot.types";

type Props = {
  depots: Depot[];
};

export default function DepotTable({ depots }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Depot Code</th>
            <th className="p-3 text-left">Depot Name</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {depots.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="p-6 text-center text-gray-500"
              >
                No Depots Found
              </td>
            </tr>
          ) : (
            depots.map((depot) => (
              <tr
                key={depot.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{depot.depotCode}</td>

                <td className="p-3">{depot.depotName}</td>

                <td className="p-3 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      depot.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {depot.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

