import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreatePizza = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreatePizza),
  //  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const pizza = await db.pizza.create({ data: input })

    return pizza
  }
)
