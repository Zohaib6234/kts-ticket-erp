import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const issues = await prisma.ticketIssue.findMany({
      include: {
        depot: true,
        supervisor: true,
        ticketBook: {
          include: {
            ticketCategory: true,
          },
        },
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
      firstSerial,
      lastSerial,
      remarks,
    } = body;

    if (
      !depotId ||
      !supervisorId ||
      firstSerial === undefined ||
      lastSerial === undefined
    ) {
      return NextResponse.json(
        {
          message: "All required fields are mandatory.",
        },
        { status: 400 }
      );
    }

    if (Number(lastSerial) < Number(firstSerial)) {
      return NextResponse.json(
        {
          message:
            "Last Book First Serial must be greater than or equal to First Book First Serial.",
        },
        { status: 400 }
      );
    }

    const books = await prisma.ticketBook.findMany({
      where: {
        depotId,
        startingSerial: {
          gte: Number(firstSerial),
          lte: Number(lastSerial),
        },
      },
      orderBy: {
        startingSerial: "asc",
      },
    });

    if (books.length === 0) {
      return NextResponse.json(
        {
          message: "No books found in this range.",
        },
        { status: 404 }
      );
    }

    for (const book of books) {
      if (book.status !== "IN_STOCK") {
        return NextResponse.json(
          {
            message: `Book ${book.startingSerial} is already ${book.status}.`,
          },
          { status: 400 }
        );
      }
    }

    await prisma.$transaction(async (tx) => {
      for (const book of books) {
        await tx.ticketIssue.create({
          data: {
            depotId,
            supervisorId,

            ticketBookId: book.id,

            // Required fields
            startingSerial: book.startingSerial,
            endingSerial: book.endingSerial,

            status: "ISSUED",

            issueDate: new Date(),

            remarks,
          },
        });

        await tx.ticketBook.update({
          where: {
            id: book.id,
          },
          data: {
            status: "ISSUED",
          },
        });
      }
    });

    return NextResponse.json({
      message: `${books.length} book(s) issued successfully.`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to issue books.",
      },
      {
        status: 500,
      }
    );
  }
}
