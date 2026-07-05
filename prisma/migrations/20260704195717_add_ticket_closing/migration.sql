-- CreateTable
CREATE TABLE "TicketClosing" (
    "id" TEXT NOT NULL,
    "supervisorId" TEXT NOT NULL,
    "ticketCategoryId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "issuedQuantity" INTEGER NOT NULL,
    "soldQuantity" INTEGER NOT NULL,
    "returnedQuantity" INTEGER NOT NULL,
    "missingQuantity" INTEGER NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "closingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketClosing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketClosing" ADD CONSTRAINT "TicketClosing_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Supervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketClosing" ADD CONSTRAINT "TicketClosing_ticketCategoryId_fkey" FOREIGN KEY ("ticketCategoryId") REFERENCES "TicketCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketClosing" ADD CONSTRAINT "TicketClosing_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "TicketIssue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
