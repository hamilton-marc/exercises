/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Topping` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Topping_name_key" ON "Topping"("name");
