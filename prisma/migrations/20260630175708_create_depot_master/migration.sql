/*
  Warnings:

  - Added the required column `depotId` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Route_routeName_key";

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "depotId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Depot" (
    "id" TEXT NOT NULL,
    "depotCode" TEXT NOT NULL,
    "depotName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Depot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Depot_depotCode_key" ON "Depot"("depotCode");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_depotId_fkey" FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
