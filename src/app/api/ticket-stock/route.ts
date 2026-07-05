

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stocks = await prisma.ticketStock.findMany({
      include: {
        depot: true,
        ticketCategory: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(stocks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch ticket stock." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      vendor,
      depotId,
      ticketCategoryId,
      startingSerial,
      endingSerial,
      remarks,
    } = body;

    if (
      !vendor ||
      !depotId ||
      !ticketCategoryId ||
      startingSerial === undefined ||
      endingSerial === undefined
    ) {
      return NextResponse.json(
        { message: "All required fields are mandatory." },
        { status: 400 }
      );
    }

    if (Number(endingSerial) < Number(startingSerial)) {
      return NextResponse.json(
        {
          message: "Ending Serial must be greater than or equal to Starting Serial.",
        },
        { status: 400 }
      );
    }

    // Duplicate serial range validation
    const duplicate = await prisma.ticketStock.findFirst({
      where: {
        ticketCategoryId,
        OR: [
          {
            startingSerial: {
              lte: Number(endingSerial),
            },
            endingSerial: {
              gte: Number(startingSerial),
            },
          },
        ],
      },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          message: "This serial range already exists.",
        },
        { status: 400 }
      );
    }

    const quantity =
      Number(endingSerial) - Number(startingSerial) + 1;

    const stock = await prisma.ticketStock.create({
  data: {
    vendor,
    depotId,
    ticketCategoryId,

    startingSerial: Number(startingSerial),
    endingSerial: Number(endingSerial),

    quantity,
    balanceQuantity: quantity,

    remarks,
  },
  include: {
    depot: true,
    ticketCategory: true,
  },
});

    return NextResponse.json(stock);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to save ticket stock." },
      { status: 500 }
    );
  }
}

