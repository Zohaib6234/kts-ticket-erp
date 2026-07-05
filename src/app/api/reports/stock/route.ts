

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const books = await prisma.ticketBook.findMany({
      where: {
        status: "IN_STOCK",
      },
      include: {
        depot: true,
        ticketCategory: true,
      },
      orderBy: {
        startingSerial: "asc",
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load stock report.",
      },
      {
        status: 500,
      }
    );
  }
}
