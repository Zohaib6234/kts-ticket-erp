/*
  Warnings:

  - A unique constraint covering the columns `[depotName]` on the table `Depot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Depot_depotName_key" ON "Depot"("depotName");
