import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const routes = await prisma.route.findMany({
      include: {
        depot: true,
      },
      where: {
        isActive: true,
      },
      orderBy: {
        routeNo: "asc",
      },
    });

    return NextResponse.json(routes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch routes." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      routeNo,
      routeName,
      description,
      depotId,
    } = body;

    if (!routeNo || !routeName || !depotId) {
      return NextResponse.json(
        {
          message: "Depot, Route No and Route Name are required.",
        },
        { status: 400 }
      );
    }

    const routeNoExists = await prisma.route.findFirst({
      where: {
        routeNo: Number(routeNo),
      },
    });

    if (routeNoExists) {
      return NextResponse.json(
        {
          message: "Route Number already exists.",
        },
        { status: 400 }
      );
    }

    const routeNameExists = await prisma.route.findFirst({
      where: {
        routeName,
      },
    });

    if (routeNameExists) {
      return NextResponse.json(
        {
          message: "Route Name already exists.",
        },
        { status: 400 }
      );
    }

    const depotExists = await prisma.depot.findUnique({
      where: {
        id: depotId,
      },
    });

    if (!depotExists) {
      return NextResponse.json(
        {
          message: "Invalid Depot selected.",
        },
        { status: 400 }
      );
    }

    const route = await prisma.route.create({
      data: {
        routeNo: Number(routeNo),
        routeName: routeName.trim(),
        description: description?.trim() || null,
        depotId,
      },
      include: {
        depot: true,
      },
    });

    return NextResponse.json(route);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create route." },
      { status: 500 }
    );
  }
}

