/*
  Warnings:

  - The values [RETURNED] on the enum `BookStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `issuedQuantity` on the `TicketClosing` table. All the data in the column will be lost.
  - You are about to drop the column `missingQuantity` on the `TicketClosing` table. All the data in the column will be lost.
  - You are about to drop the column `returnedQuantity` on the `TicketClosing` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `TicketClosing` table. All the data in the column will be lost.
  - You are about to drop the column `ticketCategoryId` on the `TicketClosing` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `TicketIssue` table. All the data in the column will be lost.
  - You are about to drop the column `ticketCategoryId` on the `TicketIssue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[issueId]` on the table `TicketClosing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastSoldSerial` to the `TicketClosing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unsoldQuantity` to the `TicketClosing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketBookId` to the `TicketIssue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('ISSUED', 'CLOSED', 'MISSING');

-- AlterEnum
BEGIN;
CREATE TYPE "BookStatus_new" AS ENUM ('IN_STOCK', 'ISSUED', 'MISSING', 'DISCARDED');
ALTER TABLE "public"."TicketBook" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "TicketBook" ALTER COLUMN "status" TYPE "BookStatus_new" USING ("status"::text::"BookStatus_new");
ALTER TYPE "BookStatus" RENAME TO "BookStatus_old";
ALTER TYPE "BookStatus_new" RENAME TO "BookStatus";
DROP TYPE "public"."BookStatus_old";
ALTER TABLE "TicketBook" ALTER COLUMN "status" SET DEFAULT 'IN_STOCK';
COMMIT;

-- DropForeignKey
ALTER TABLE "TicketClosing" DROP CONSTRAINT "TicketClosing_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "TicketClosing" DROP CONSTRAINT "TicketClosing_ticketCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "TicketIssue" DROP CONSTRAINT "TicketIssue_ticketCategoryId_fkey";

-- AlterTable
ALTER TABLE "TicketClosing" DROP COLUMN "issuedQuantity",
DROP COLUMN "missingQuantity",
DROP COLUMN "returnedQuantity",
DROP COLUMN "supervisorId",
DROP COLUMN "ticketCategoryId",
ADD COLUMN     "lastSoldSerial" INTEGER NOT NULL,
ADD COLUMN     "unsoldQuantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TicketIssue" DROP COLUMN "quantity",
DROP COLUMN "ticketCategoryId",
ADD COLUMN     "status" "IssueStatus" NOT NULL DEFAULT 'ISSUED',
ADD COLUMN     "ticketBookId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TicketClosing_issueId_key" ON "TicketClosing"("issueId");

-- AddForeignKey
ALTER TABLE "TicketIssue" ADD CONSTRAINT "TicketIssue_ticketBookId_fkey" FOREIGN KEY ("ticketBookId") REFERENCES "TicketBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
