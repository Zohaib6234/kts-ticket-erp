

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const issues = await prisma.ticketIssue.findMany({
      include: {
        depot: true,
        supervisor: true,
        ticketCategory: true,
      },
      orderBy: {
        issueDate: "desc",
      },
    });

    return NextResponse.json(issues);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch ticket issues." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      depotId,
      supervisorId,
      ticketCategoryId,
      quantity,
      remarks,
    } = body;

    if (
      !depotId ||
      !supervisorId ||
      !ticketCategoryId ||
      !quantity
    ) {
      return NextResponse.json(
        {
          message: "All required fields are mandatory.",
        },
        { status: 400 }
      );
    }

    // Find stock for depot + category
    const stock = await prisma.ticketStock.findFirst({
      where: {
        depotId,
        ticketCategoryId,
      },
    });

    if (!stock) {
      return NextResponse.json(
        {
          message: "Ticket stock not found.",
        },
        { status: 404 }
      );
    }

    if (stock.balanceQuantity < Number(quantity)) {
      return NextResponse.json(
        {
          message: "Insufficient ticket stock.",
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const issue = await tx.ticketIssue.create({
        data: {
          depotId,
          supervisorId,
          ticketCategoryId,
          quantity: Number(quantity),
          remarks,
        },
      });

      await tx.ticketStock.update({
        where: {
          id: stock.id,
        },
        data: {
          issuedQuantity: {
            increment: Number(quantity),
          },
          balanceQuantity: {
            decrement: Number(quantity),
          },
        },
      });

      return issue;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to issue tickets.",
      },
      {
        status: 500,
      }
    );
  }
}

