/*
  Warnings:

  - You are about to drop the column `bookNumber` on the `TicketBook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[startingSerial]` on the table `TicketBook` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TicketBook_bookNumber_key";

-- AlterTable
ALTER TABLE "TicketBook" DROP COLUMN "bookNumber";

-- CreateIndex
CREATE UNIQUE INDEX "TicketBook_startingSerial_key" ON "TicketBook"("startingSerial");
