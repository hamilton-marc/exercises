import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteTopping = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteTopping),
  //  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const topping = await db.topping.deleteMany({ where: { id } })

    return topping
  }
)
