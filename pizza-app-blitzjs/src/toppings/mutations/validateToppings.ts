import db from "db"

export default async function toppingAlreadyExists(input: { name: string }) {
  const existingTopping = await db.topping.findFirst({ where: { name: input.name } })

  return existingTopping ? true : false
}
