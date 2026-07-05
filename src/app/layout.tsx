import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "./globals.css";

export const metadata: Metadata = {
  title: "KTS Ticket ERP",
  description: "Transport Ticket ERP System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gray-100 antialiased">
        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#1f2937",
              color: "#fff",
            },
            success: {
              duration: 2500,
            },
            error: {
              duration: 4000,
            },
          }}
        />
      </body>
    </html>
  );
}

