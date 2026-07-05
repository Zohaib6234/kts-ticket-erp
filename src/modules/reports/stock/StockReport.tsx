

"use client";

import { useEffect, useMemo, useState } from "react";

import { getStockReport } from "./stock.service";
import { StockBook } from "./stock.types";
import StockTable from "./StockTable";

import toast from "react-hot-toast";

export default function StockReport() {
  const [books, setBooks] = useState<StockBook[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [depot, setDepot] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const data = await getStockReport();

      setBooks(data);
    } catch {
      toast.error("Failed to load stock report.");
    } finally {
      setLoading(false);
    }
  }

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const serialMatch =
        search === "" ||
        book.startingSerial
          .toString()
          .includes(search);

      const depotMatch =
        depot === "" ||
        book.depot.depotName === depot;

      const categoryMatch =
        category === "" ||
        book.ticketCategory.name === category;

      return (
        serialMatch &&
        depotMatch &&
        categoryMatch
      );
    });
  }, [books, search, depot, category]);

  const depots = [
    ...new Set(
      books.map((x) => x.depot.depotName)
    ),
  ];

  const categories = [
    ...new Set(
      books.map(
        (x) => x.ticketCategory.name
      )
    ),
  ];

  const totalBooks = filteredBooks.length;

  const totalTickets =
    totalBooks * 100;

  const totalValue = filteredBooks.reduce(
    (sum, book) =>
      sum +
      Number(book.ticketCategory.amount) *
        100,
    0
  );

  return (
    <div className="space-y-6 p-6">

      <h1 className="text-2xl font-bold">
        Stock Report
      </h1>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

        <div className="rounded-lg border bg-white p-5">
          <p className="text-gray-500">
            Books
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalBooks}
          </h2>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <p className="text-gray-500">
            Tickets
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalTickets}
          </h2>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <p className="text-gray-500">
            Value
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Rs.{" "}
            {totalValue.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <p className="text-gray-500">
            Status
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            IN STOCK
          </h2>
        </div>

      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <input
          type="text"
          placeholder="Search First Serial..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="rounded border p-2"
        />

        <select
          value={depot}
          onChange={(e) =>
            setDepot(e.target.value)
          }
          className="rounded border p-2"
        >
          <option value="">
            All Depots
          </option>

          {depots.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="rounded border p-2"
        >
          <option value="">
            All Categories
          </option>

          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

      </div>

      {loading ? (
        <div className="rounded-lg bg-white p-10 text-center">
          Loading...
        </div>
      ) : (
        <StockTable books={filteredBooks} />
      )}

    </div>
  );
}
