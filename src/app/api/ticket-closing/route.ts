
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const closings = await prisma.ticketClosing.findMany({
      include: {
        supervisor: true,
        ticketCategory: true,
        issue: true,
      },
      orderBy: {
        closingDate: "desc",
      },
    });

    return NextResponse.json(closings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch ticket closings." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      issueId,
      supervisorId,
      ticketCategoryId,
      soldQuantity,
      returnedQuantity,
      remarks,
    } = body;

    if (
      !issueId ||
      !supervisorId ||
      !ticketCategoryId ||
      soldQuantity === undefined ||
      returnedQuantity === undefined
    ) {
      return NextResponse.json(
        { message: "All required fields are mandatory." },
        { status: 400 }
      );
    }

    // Prevent duplicate closing
    const existing = await prisma.ticketClosing.findFirst({
      where: {
        issueId,
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Closing already exists for this issue." },
        { status: 400 }
      );
    }

    // Get Issue
    const issue = await prisma.ticketIssue.findUnique({
      where: {
        id: issueId,
      },
      include: {
        ticketCategory: true,
      },
    });

    if (!issue) {
      return NextResponse.json(
        { message: "Issue record not found." },
        { status: 404 }
      );
    }

    const issuedQuantity = issue.quantity;

    if (
      soldQuantity + returnedQuantity >
      issuedQuantity
    ) {
      return NextResponse.json(
        {
          message:
            "Sold + Returned cannot exceed Issued Quantity.",
        },
        { status: 400 }
      );
    }

    const missingQuantity =
      issuedQuantity -
      soldQuantity -
      returnedQuantity;

    const totalAmount =
      Number(issue.ticketCategory.amount) *
      soldQuantity;

    const closing = await prisma.ticketClosing.create({
      data: {
        issueId,
        supervisorId,
        ticketCategoryId,

        issuedQuantity,
        soldQuantity: Number(soldQuantity),
        returnedQuantity: Number(returnedQuantity),
        missingQuantity,

        totalAmount,
        remarks,
      },
      include: {
        supervisor: true,
        ticketCategory: true,
        issue: true,
      },
    });

    return NextResponse.json(closing);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to save closing." },
      { status: 500 }
    );
  }
}

