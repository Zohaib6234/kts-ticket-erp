"use client";

import { Menu } from "lucide-react";

type Props = {
  onToggleSidebar: () => void;
};

export default function Header({ onToggleSidebar }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-blue-700 text-white shadow">
      <div className="flex h-full items-center justify-between px-4">

        <div className="flex items-center gap-3">

          <button
            onClick={onToggleSidebar}
            className="rounded-md p-2 hover:bg-blue-600"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-xl font-bold">
            KTS Ticket ERP
          </h1>

        </div>

        <div>

          <span className="text-sm">
            Welcome, Admin
          </span>

        </div>

      </div>
    </header>
  );
}

