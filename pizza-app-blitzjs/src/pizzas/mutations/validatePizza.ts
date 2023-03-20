import db from "db"

async function pizzaAlreadyExists(input) {
  const existingPizza = await db.topping.findFirst({ where: { name: input.name } })

  return existingPizza ? true : false
}

async function pizzaWithToppingsAlreadyExists(input) {
  const existingPizza = await db.topping.findFirst({ where: { name: input.name } })

  return existingPizza ? true : false
}
