

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

// =========================
// GET Single
// =========================

export async function GET(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const stock = await prisma.ticketStock.findUnique({
      where: { id },
      include: {
        depot: true,
        ticketCategory: true,
      },
    });

    if (!stock) {
      return NextResponse.json(
        { message: "Ticket Stock not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(stock);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch Ticket Stock." },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE
// =========================

export async function PUT(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

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
      !ticketCategoryId
    ) {
      return NextResponse.json(
        {
          message: "Required fields missing.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      Number(endingSerial) <
      Number(startingSerial)
    ) {
      return NextResponse.json(
        {
          message:
            "Ending Serial must be greater than Starting Serial.",
        },
        {
          status: 400,
        }
      );
    }

    const quantity =
      Number(endingSerial) -
      Number(startingSerial) +
      1;

    const updated = await prisma.ticketStock.update({
      where: {
        id,
      },
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

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update Ticket Stock.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// DELETE
// =========================

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    await prisma.ticketStock.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Ticket Stock deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete Ticket Stock.",
      },
      {
        status: 500,
      }
    );
  }
}

