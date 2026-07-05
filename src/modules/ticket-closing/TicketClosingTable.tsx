

"use client";

import { TicketClosing } from "./ticketClosing.types";

type Props = {
  closings: TicketClosing[];
};

export default function TicketClosingTable({
  closings,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">

        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Supervisor
            </th>

            <th className="px-4 py-3 text-left">
              Category
            </th>

            <th className="px-4 py-3 text-left">
              Issued
            </th>

            <th className="px-4 py-3 text-left">
              Sold
            </th>

            <th className="px-4 py-3 text-left">
              Returned
            </th>

            <th className="px-4 py-3 text-left">
              Missing
            </th>

            <th className="px-4 py-3 text-left">
              Amount
            </th>

            <th className="px-4 py-3 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>

          {closings.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-8 text-center text-gray-500"
              >
                No Closing Found
              </td>
            </tr>
          ) : (
            closings.map((closing) => (
              <tr
                key={closing.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  {closing.supervisor?.supervisorName}
                </td>

                <td className="px-4 py-3">
                  {closing.ticketCategory?.name}
                </td>

                <td className="px-4 py-3">
                  {closing.issuedQuantity}
                </td>

                <td className="px-4 py-3">
                  {closing.soldQuantity}
                </td>

                <td className="px-4 py-3">
                  {closing.returnedQuantity}
                </td>

                <td className="px-4 py-3">
                  {closing.missingQuantity}
                </td>

                <td className="px-4 py-3 font-semibold">
                  Rs. {Number(closing.totalAmount).toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  {new Date(
                    closing.closingDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}

