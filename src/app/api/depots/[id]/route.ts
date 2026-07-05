import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "KTS Ticket ERP API",
    status: "OK",
  });
}