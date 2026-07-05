

"use client";

import { TicketIssue } from "./ticketIssue.types";

type Props = {
  issues: TicketIssue[];
};

export default function TicketIssueTable({
  issues,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Depot
            </th>

            <th className="px-4 py-3 text-left">
              Supervisor
            </th>

            <th className="px-4 py-3 text-left">
              Category
            </th>

            <th className="px-4 py-3 text-left">
              Quantity
            </th>

            <th className="px-4 py-3 text-left">
              Issue Date
            </th>

            <th className="px-4 py-3 text-left">
              Remarks
            </th>
          </tr>
        </thead>

        <tbody>
          {issues.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-8 text-center text-gray-500"
              >
                No Ticket Issues Found
              </td>
            </tr>
          ) : (
            issues.map((issue) => (
              <tr
                key={issue.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  {issue.depot?.depotName}
                </td>

                <td className="px-4 py-3">
                  {issue.supervisor?.supervisorName}
                </td>

                <td className="px-4 py-3">
                  {issue.ticketCategory?.name}
                </td>

                <td className="px-4 py-3 font-semibold">
                  {issue.quantity}
                </td>

                <td className="px-4 py-3">
                  {new Date(
                    issue.issueDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {issue.remarks || "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

