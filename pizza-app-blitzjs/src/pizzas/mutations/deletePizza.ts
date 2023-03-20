import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeletePizza = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeletePizza),
  //  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const pizza = await db.pizza.deleteMany({ where: { id } })

    return pizza
  }
)
