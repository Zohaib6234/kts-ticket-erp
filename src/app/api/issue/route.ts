

import { NextResponse } from "next/server";
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
      {
        message: "Failed to load issue report.",
      },
      {
        status: 500,
      }
    );
  }
}

