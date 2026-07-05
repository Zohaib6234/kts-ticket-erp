"use client";

import { TicketStock } from "./ticketStock.types";

type Props = {
  stocks: TicketStock[];
  onEdit: (stock: TicketStock) => void;
  onDelete: (id: string) => void;
};

export default function TicketStockTable({
  stocks,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Vendor</th>
            <th className="px-4 py-3 text-left">Depot</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Start</th>
            <th className="px-4 py-3 text-left">End</th>
            <th className="px-4 py-3 text-left">Qty</th>
            <th className="px-4 py-3 text-left">Received</th>
            <th className="px-4 py-3 text-left">Remarks</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="py-8 text-center text-gray-500"
              >
                No Ticket Stock Found
              </td>
            </tr>
          ) : (
            stocks.map((stock) => (
              <tr
                key={stock.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  {stock.vendor}
                </td>

                <td className="px-4 py-3">
                  {stock.depot?.depotName}
                </td>

                <td className="px-4 py-3">
                  {stock.ticketCategory?.name}
                </td>

                <td className="px-4 py-3">
                  {stock.startingSerial}
                </td>

                <td className="px-4 py-3">
                  {stock.endingSerial}
                </td>

                <td className="px-4 py-3 font-semibold">
                  {stock.quantity}
                </td>

                <td className="px-4 py-3">
                  {new Date(
                    stock.receivedDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {stock.remarks || "-"}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => onEdit(stock)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(stock.id)}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

