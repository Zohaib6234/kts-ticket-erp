import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.ticketCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch ticket categories.",
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

    const { name, amount } = body;

    if (!name || amount === undefined || amount === "") {
      return NextResponse.json(
        {
          message: "Name and Amount are required.",
        },
        {
          status: 400,
        }
      );
    }

    const existing = await prisma.ticketCategory.findFirst({
      where: {
        name,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Ticket Category already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const category = await prisma.ticketCategory.create({
      data: {
        name,
        amount,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create ticket category.",
      },
      {
        status: 500,
      }
    );
  }
}

