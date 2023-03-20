import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import toppingAlreadyExists from "./validateToppings"

const UpdateTopping = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTopping),
  //resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    if (await toppingAlreadyExists(data)) {
      throw new Error(`Topping ${data.name} already exists`)
    }

    const topping = await db.topping.update({ where: { id }, data })

    return topping
  }
)
