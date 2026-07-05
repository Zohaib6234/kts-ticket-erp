-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('IN_STOCK', 'ISSUED', 'RETURNED', 'MISSING', 'DISCARDED');

-- CreateTable
CREATE TABLE "TicketBook" (
    "id" TEXT NOT NULL,
    "bookNumber" INTEGER NOT NULL,
    "startingSerial" INTEGER NOT NULL,
    "endingSerial" INTEGER NOT NULL,
    "totalTickets" INTEGER NOT NULL DEFAULT 100,
    "depotId" TEXT NOT NULL,
    "ticketCategoryId" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'IN_STOCK',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TicketBook_bookNumber_key" ON "TicketBook"("bookNumber");

-- AddForeignKey
ALTER TABLE "TicketBook" ADD CONSTRAINT "TicketBook_depotId_fkey" FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketBook" ADD CONSTRAINT "TicketBook_ticketCategoryId_fkey" FOREIGN KEY ("ticketCategoryId") REFERENCES "TicketCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
