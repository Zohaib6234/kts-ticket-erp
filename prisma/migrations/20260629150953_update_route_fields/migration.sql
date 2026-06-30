/*
  Warnings:

  - You are about to drop the column `code` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Route` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[routeNo]` on the table `Route` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[routeName]` on the table `Route` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `routeName` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeNo` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "code",
DROP COLUMN "name",
ADD COLUMN     "routeName" TEXT NOT NULL,
ADD COLUMN     "routeNo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Route_routeNo_key" ON "Route"("routeNo");

-- CreateIndex
CREATE UNIQUE INDEX "Route_routeName_key" ON "Route"("routeName");
