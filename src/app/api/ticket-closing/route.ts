import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const closings = await prisma.ticketClosing.findMany({
      include: {
        issue: {
          include: {
            supervisor: true,
            depot: true,
            ticketBook: {
              include: {
                ticketCategory: true,
              },
            },
          },
        },
      },
      orderBy: {
        closingDate: "desc",
      },
    });

    return NextResponse.json(closings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch closings." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { lastSoldSerial, remarks } = body;

    if (lastSoldSerial === undefined) {
      return NextResponse.json(
        {
          message: "Last Sold Ticket Serial is required.",
        },
        {
          status: 400,
        }
      );
    }

    const issue = await prisma.ticketIssue.findFirst({
      where: {
        status: "ISSUED",

        startingSerial: {
          lte: Number(lastSoldSerial),
        },

        endingSerial: {
          gte: Number(lastSoldSerial),
        },
      },
      include: {
        ticketBook: {
          include: {
            ticketCategory: true,
          },
        },
      },
    });

    if (!issue) {
      return NextResponse.json(
        {
          message: "Issued book not found.",
        },
        {
          status: 404,
        }
      );
    }

    const soldQuantity =
      Number(lastSoldSerial) -
      issue.startingSerial +
      1;

    const unsoldQuantity =
      issue.ticketBook.totalTickets -
      soldQuantity;

    const totalAmount =
      soldQuantity *
      Number(issue.ticketBook.ticketCategory.amount);

    const result = await prisma.$transaction(async (tx) => {
      const closing =
        await tx.ticketClosing.create({
          data: {
            issueId: issue.id,

            lastSoldSerial: Number(lastSoldSerial),

            soldQuantity,

            unsoldQuantity,

            totalAmount,

            remarks,
          },
        });

      await tx.ticketIssue.update({
        where: {
          id: issue.id,
        },
        data: {
          status: "CLOSED",
        },
      });

      await tx.ticketBook.update({
        where: {
          id: issue.ticketBookId,
        },
        data: {
          status: "DISCARDED",
        },
      });

      return closing;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to close book.",
      },
      {
        status: 500,
      }
    );
  }
}
