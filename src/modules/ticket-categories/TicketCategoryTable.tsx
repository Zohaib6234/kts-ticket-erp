

"use client";

import { TicketCategory } from "./ticketCategory.types";

type Props = {
  categories: TicketCategory[];
};

export default function TicketCategoryTable({
  categories,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="py-6 text-center text-gray-500"
              >
                No Ticket Categories Found
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr
                key={category.id}
                className="border-t"
              >
                <td className="px-4 py-3">
                  {category.name}
                </td>

                <td className="px-4 py-3">
                  Rs. {Number(category.amount).toFixed(2)}
                </td>

                <td className="px-4 py-3">
                  {category.isActive ? (
                    <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded bg-red-100 px-2 py-1 text-red-700">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

