import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetToppingsInput
  extends Pick<Prisma.ToppingFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  //  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetToppingsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: toppings,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.topping.count({ where }),
      query: (paginateArgs) => db.topping.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      toppings,
      nextPage,
      hasMore,
      count,
    }
  }
)
