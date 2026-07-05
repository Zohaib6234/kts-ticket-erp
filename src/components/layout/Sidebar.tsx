"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Depots",
    href: "/depots",
  },
  {
    title: "Routes",
    href: "/routes",
  },
  {
    title: "Supervisors",
    href: "/supervisors",
  },
  {
    title: "Ticket Categories",
    href: "/ticket-categories",
  },
  {
    title: "Receive Books",
    href: "/ticket-stock",
  },
  {
    title: "Issue Books",
    href: "/issue",
  },
  {
    title: "Closing",
    href: "/closing",
  },
  {
    title: "Stock Report",
    href: "/reports/stock",
  },
  {
    title: "Issue Report",
    href: "/reports/issue",
  },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40
          h-screen w-64
          bg-slate-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="border-b border-slate-700 p-5">
          <h1 className="text-xl font-bold">
            KTS Ticket ERP
          </h1>
        </div>

        <nav className="p-3">
          {menus.map((menu) => {
            const active = pathname === menu.href;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={onClose}
                className={`block rounded-md px-4 py-3 mb-1 transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800"
                }`}
              >
                {menu.title}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

