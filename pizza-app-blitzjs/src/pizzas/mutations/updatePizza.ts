import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdatePizza = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePizza),
  //  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const pizza = await db.pizza.update({ where: { id }, data })

    return pizza
  }
)
