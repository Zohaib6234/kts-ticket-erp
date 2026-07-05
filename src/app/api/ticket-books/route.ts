import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const books = await prisma.ticketBook.findMany({
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
        message: "Failed to fetch books.",
      },
      {
        status: 500,
      }
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
      startSerial,
      endSerial,
    } = body;

    if (
      !vendor ||
      !depotId ||
      !ticketCategoryId ||
      startSerial === undefined ||
      endSerial === undefined
    ) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (Number(endSerial) < Number(startSerial)) {
      return NextResponse.json(
        {
          message:
            "Last Book First Serial must be greater than First Book First Serial.",
        },
        {
          status: 400,
        }
      );
    }

    const books = [];

    for (
      let serial = Number(startSerial);
      serial <= Number(endSerial);
      serial += 100
    ) {
      const exists = await prisma.ticketBook.findFirst({
        where: {
          startingSerial: serial,
        },
      });

      if (exists) {
        continue;
      }

      const created = await prisma.ticketBook.create({
        data: {
          vendor,
          depotId,
          ticketCategoryId,

          startingSerial: serial,
          endingSerial: serial + 99,
        },
      });

      books.push(created);
    }

    return NextResponse.json(books);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to receive books.",
      },
      {
        status: 500,
      }
    );
  }
}
