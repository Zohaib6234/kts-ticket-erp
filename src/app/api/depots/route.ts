
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const depots = await prisma.depot.findMany({
      orderBy: {
        depotCode: "asc",
      },
    });

    return NextResponse.json(depots);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch depots." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      depotCode,
      depotName,
      isActive = true,
    } = body;

    if (!depotCode || !depotName) {
      return NextResponse.json(
        {
          message: "Depot Code and Depot Name are required.",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.depot.findFirst({
      where: {
        OR: [
          {
            depotCode,
          },
          {
            depotName,
          },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Depot already exists.",
        },
        { status: 400 }
      );
    }

    const depot = await prisma.depot.create({
      data: {
        depotCode,
        depotName,
        isActive,
      },
    });

    return NextResponse.json(depot);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create depot." },
      { status: 500 }
    );
  }
}
