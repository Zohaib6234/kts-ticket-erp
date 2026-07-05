/*
  Warnings:

  - Added the required column `balanceQuantity` to the `TicketStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketStock" ADD COLUMN     "balanceQuantity" INTEGER NOT NULL,
ADD COLUMN     "issuedQuantity" INTEGER NOT NULL DEFAULT 0;
