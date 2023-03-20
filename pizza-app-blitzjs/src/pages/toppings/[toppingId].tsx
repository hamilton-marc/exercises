import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getTopping from "src/toppings/queries/getTopping"
import deleteTopping from "src/toppings/mutations/deleteTopping"

export const Topping = () => {
  const router = useRouter()
  const toppingId = useParam("toppingId", "number")
  const [deleteToppingMutation] = useMutation(deleteTopping)
  const [topping] = useQuery(getTopping, { id: toppingId })

  return (
    <>
      <Head>
        <title>Topping {topping.id}</title>
      </Head>

      <div>
        <h1>Topping {topping.id}</h1>
        <pre>{JSON.stringify(topping, null, 2)}</pre>

        <Link href={Routes.EditToppingPage({ toppingId: topping.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteToppingMutation({ id: topping.id })
              await router.push(Routes.ToppingsPage())
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

const ShowToppingPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ToppingsPage()}>
          <a>Toppings</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Topping />
      </Suspense>
    </div>
  )
}

ShowToppingPage.authenticate = false
ShowToppingPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowToppingPage
