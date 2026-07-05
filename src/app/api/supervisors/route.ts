
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const supervisors = await prisma.supervisor.findMany({
      include: {
        depot: true,
        route: true,
      },
      orderBy: {
        supervisorCode: "asc",
      },
    });

    return NextResponse.json(supervisors);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch supervisors." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      supervisorCode,
      supervisorName,
      depotId,
      routeId,
      isActive = true,
    } = body;

    if (
      !supervisorCode ||
      !supervisorName ||
      !depotId ||
      !routeId
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

    const existing = await prisma.supervisor.findFirst({
      where: {
        supervisorCode,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Supervisor already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const supervisor = await prisma.supervisor.create({
      data: {
        supervisorCode,
        supervisorName,
        isActive,

        depot: {
          connect: {
            id: depotId,
          },
        },

        route: {
          connect: {
            id: routeId,
          },
        },
      },
      include: {
        depot: true,
        route: true,
      },
    });

    return NextResponse.json(supervisor);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create supervisor.",
      },
      {
        status: 500,
      }
    );
  }
}

