/*
  Warnings:

  - A unique constraint covering the columns `[routeName]` on the table `Route` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Supervisor" (
    "id" TEXT NOT NULL,
    "supervisorCode" TEXT NOT NULL,
    "supervisorName" TEXT NOT NULL,
    "depotId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supervisor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supervisor_supervisorCode_key" ON "Supervisor"("supervisorCode");

-- CreateIndex
CREATE UNIQUE INDEX "Route_routeName_key" ON "Route"("routeName");

-- AddForeignKey
ALTER TABLE "Supervisor" ADD CONSTRAINT "Supervisor_depotId_fkey" FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supervisor" ADD CONSTRAINT "Supervisor_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
