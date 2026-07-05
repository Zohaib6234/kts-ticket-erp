

"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import BookReceiveForm from "@/modules/ticket-books/BookReceiveForm";
import BookTable from "@/modules/ticket-books/BookTable";

import {
  getBooks,
} from "@/modules/ticket-books/book.service";

import {
  TicketBook,
} from "@/modules/ticket-books/book.types";

export default function TicketBooksPage() {
  const [books, setBooks] = useState<TicketBook[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBooks() {
    try {
      setLoading(true);

      const data = await getBooks();

      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="space-y-6">

      <PageHeader
        title="Receive Books"
        description="Manage Ticket Books"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div>
          <BookReceiveForm
            onSaved={loadBooks}
          />
        </div>

        <div className="lg:col-span-2">

          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Books ({books.length})
            </h2>
          </div>

          {loading ? (
            <div className="rounded-lg border bg-white p-8 text-center">
              Loading...
            </div>
          ) : (
            <BookTable books={books} />
          )}

        </div>

      </div>

    </div>
  );
}

