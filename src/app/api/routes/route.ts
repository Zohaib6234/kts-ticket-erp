import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const routes = await prisma.route.findMany({
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

    const { routeNo, routeName, description } = body;

    if (!routeNo || !routeName) {
      return NextResponse.json(
        { message: "Route No and Route Name are required." },
        { status: 400 }
      );
    }

    // Duplicate Route Number
    const routeNoExists = await prisma.route.findFirst({
      where: {
        routeNo: Number(routeNo),
      },
    });

    if (routeNoExists) {
      return NextResponse.json(
        { message: "Route Number already exists." },
        { status: 400 }
      );
    }

    // Duplicate Route Name
    const routeNameExists = await prisma.route.findFirst({
      where: {
        routeName,
      },
    });

    if (routeNameExists) {
      return NextResponse.json(
        { message: "Route Name already exists." },
        { status: 400 }
      );
    }

    const route = await prisma.route.create({
      data: {
        routeNo: Number(routeNo),
        routeName,
        description,
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
