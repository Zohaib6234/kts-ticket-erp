

"use client";

import { StockBook } from "./stock.types";

type Props = {
  books: StockBook[];
};

export default function StockTable({
  books,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-4 py-3 text-left">
              First Serial
            </th>

            <th className="px-4 py-3 text-left">
              Last Serial
            </th>

            <th className="px-4 py-3 text-left">
              Depot
            </th>

            <th className="px-4 py-3 text-left">
              Category
            </th>

            <th className="px-4 py-3 text-left">
              Vendor
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {books.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="py-8 text-center text-gray-500"
              >
                No Stock Available
              </td>

            </tr>

          ) : (

            books.map((book) => (

              <tr
                key={book.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-4 py-3 font-medium">
                  {book.startingSerial}
                </td>

                <td className="px-4 py-3">
                  {book.endingSerial}
                </td>

                <td className="px-4 py-3">
                  {book.depot.depotName}
                </td>

                <td className="px-4 py-3">
                  {book.ticketCategory.name}
                </td>

                <td className="px-4 py-3">
                  {book.vendor}
                </td>

                <td className="px-4 py-3 text-center">

                  <span className="rounded bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                    IN STOCK

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
