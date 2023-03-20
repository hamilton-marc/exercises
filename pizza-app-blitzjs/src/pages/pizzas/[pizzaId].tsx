import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPizza from "src/pizzas/queries/getPizza"
import deletePizza from "src/pizzas/mutations/deletePizza"

export const Pizza = () => {
  const router = useRouter()
  const pizzaId = useParam("pizzaId", "number")
  const [deletePizzaMutation] = useMutation(deletePizza)
  const [pizza] = useQuery(getPizza, { id: pizzaId })

  return (
    <>
      <Head>
        <title>Pizza {pizza.id}</title>
      </Head>

      <div>
        <h1>Pizza {pizza.id}</h1>
        <pre>{JSON.stringify(pizza, null, 2)}</pre>

        <h3>Toppings:</h3>
        <div>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>

        <Link href={Routes.EditPizzaPage({ pizzaId: pizza.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePizzaMutation({ id: pizza.id })
              await router.push(Routes.PizzasPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPizzaPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PizzasPage()}>
          <a>Pizzas</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Pizza />
      </Suspense>
    </div>
  )
}

ShowPizzaPage.authenticate = false
ShowPizzaPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPizzaPage
