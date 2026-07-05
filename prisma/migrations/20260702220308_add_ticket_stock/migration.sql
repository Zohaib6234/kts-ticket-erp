-- CreateTable
CREATE TABLE "TicketStock" (
    "id" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "depotId" TEXT NOT NULL,
    "ticketCategoryId" TEXT NOT NULL,
    "startingSerial" INTEGER NOT NULL,
    "endingSerial" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "receivedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketStock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketStock" ADD CONSTRAINT "TicketStock_depotId_fkey" FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketStock" ADD CONSTRAINT "TicketStock_ticketCategoryId_fkey" FOREIGN KEY ("ticketCategoryId") REFERENCES "TicketCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
