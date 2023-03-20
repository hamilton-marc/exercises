-- CreateTable
CREATE TABLE "_PizzaToTopping" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PizzaToTopping_A_fkey" FOREIGN KEY ("A") REFERENCES "Pizza" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PizzaToTopping_B_fkey" FOREIGN KEY ("B") REFERENCES "Topping" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PizzaToTopping_AB_unique" ON "_PizzaToTopping"("A", "B");

-- CreateIndex
CREATE INDEX "_PizzaToTopping_B_index" ON "_PizzaToTopping"("B");
