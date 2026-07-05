

"use client";

import { Supervisor } from "./supervisor.types";

type Props = {
  supervisors: Supervisor[];
};

export default function SupervisorTable({
  supervisors,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="border px-4 py-3 text-left">
              Code
            </th>

            <th className="border px-4 py-3 text-left">
              Name
            </th>

            <th className="border px-4 py-3 text-left">
              Depot
            </th>

            <th className="border px-4 py-3 text-left">
              Route
            </th>

            <th className="border px-4 py-3 text-center">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {supervisors.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center"
              >
                No supervisors found.
              </td>
            </tr>
          )}

          {supervisors.map((item) => (
            <tr key={item.id}>

              <td className="border px-4 py-3">
                {item.supervisorCode}
              </td>

              <td className="border px-4 py-3">
                {item.supervisorName}
              </td>

              <td className="border px-4 py-3">
                {item.depot.depotName}
              </td>

              <td className="border px-4 py-3">
                {item.route.routeName}
              </td>

              <td className="border px-4 py-3 text-center">

                <span
                  className={
                    item.isActive
                      ? "rounded bg-green-100 px-3 py-1 text-green-700"
                      : "rounded bg-red-100 px-3 py-1 text-red-700"
                  }
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

