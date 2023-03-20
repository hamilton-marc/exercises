import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPizzasInput
  extends Pick<Prisma.PizzaFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  //  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPizzasInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: pizzas,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.pizza.count({ where }),
      query: (paginateArgs) => db.pizza.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      pizzas,
      nextPage,
      hasMore,
      count,
    }
  }
)
