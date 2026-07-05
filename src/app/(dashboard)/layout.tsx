"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-open");

    if (saved !== null) {
      setSidebarOpen(saved === "true");
    } else {
      // Desktop par default open
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sidebar-open",
      String(sidebarOpen)
    );
  }, [sidebarOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        onToggleSidebar={() =>
          setSidebarOpen((prev) => !prev)
        }
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <section className="pt-20 px-4 md:px-8 md:ml-64">
        {children}
      </section>
    </main>
  );
}

