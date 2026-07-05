"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  Route,
  UserCog,
  Package,
  Ticket,
  CheckCircle2,
  CircleAlert,
  Trash2,
  FileBarChart2,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Depots",
    href: "/depots",
    icon: Building2,
  },
  {
    name: "Routes",
    href: "/routes",
    icon: Route,
  },
  {
  name: "Supervisors",
  href: "/supervisors",
  icon: UserCog,
},
{
  name: "Ticket Categories",
  href: "/ticket-categories",
  icon: Ticket,
},
{
  name: "Ticket Stock",
  href: "/ticket-stock",
  icon: Package,
},
  {
    name: "Issue",
    href: "/issue",
    icon: Ticket,
  },
  {
    name: "Closing",
    href: "/closing",
    icon: CheckCircle2,
  },
  {
    name: "Missing",
    href: "/missing",
    icon: CircleAlert,
  },
  {
    name: "Discard",
    href: "/discard",
    icon: Trash2,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileBarChart2,
  },
];

export default function Sidebar({
  open,
  onClose,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      <aside
        className={`fixed top-16 left-0 z-50 h-[calc(100vh-64px)] w-64 overflow-y-auto bg-slate-900 text-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-3">

          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                onClick={onClose}
                className={`mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  active
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />

                <span>
                  {menu.name}
                </span>
              </Link>
            );
          })}

        </nav>
      </aside>
    </>
  );
}

