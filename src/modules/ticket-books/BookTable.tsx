

"use client";

import { TicketBook } from "./book.types";

type Props = {
  books: TicketBook[];
};

export default function BookTable({
  books,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Book
            </th>

            <th className="px-4 py-3 text-left">
              Category
            </th>

            <th className="px-4 py-3 text-left">
              Depot
            </th>

            <th className="px-4 py-3 text-left">
              Vendor
            </th>

            <th className="px-4 py-3 text-left">
              Tickets
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-6 text-center text-gray-500"
              >
                No Books Found
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr
                key={book.id}
                className="border-t"
              >
                <td className="px-4 py-3 font-medium">
                  {book.startingSerial}
                </td>

                <td className="px-4 py-3">
                  {book.ticketCategory?.name}
                </td>

                <td className="px-4 py-3">
                  {book.depot?.depotName}
                </td>

                <td className="px-4 py-3">
                  {book.vendor}
                </td>

                <td className="px-4 py-3">
                  {book.startingSerial} - {book.endingSerial}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold
                      ${
                        book.status === "IN_STOCK"
                          ? "bg-green-100 text-green-700"
                          : book.status === "ISSUED"
                          ? "bg-blue-100 text-blue-700"
                          : book.status === "RETURNED"
                          ? "bg-yellow-100 text-yellow-700"
                          : book.status === "MISSING"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    {book.status}
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

