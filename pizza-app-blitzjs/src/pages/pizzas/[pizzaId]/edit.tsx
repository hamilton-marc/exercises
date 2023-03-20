import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPizza from "src/pizzas/queries/getPizza"
import updatePizza from "src/pizzas/mutations/updatePizza"
import { PizzaForm, FORM_ERROR } from "src/pizzas/components/PizzaForm"

export const EditPizza = () => {
  const router = useRouter()
  const pizzaId = useParam("pizzaId", "number")
  const [pizza, { setQueryData }] = useQuery(
    getPizza,
    { id: pizzaId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePizzaMutation] = useMutation(updatePizza)

  return (
    <>
      <Head>
        <title>Edit Pizza {pizza.id}</title>
      </Head>

      <div>
        <h1>Edit Pizza {pizza.id}</h1>
        <pre>{JSON.stringify(pizza, null, 2)}</pre>

        <PizzaForm
          submitText="Update Pizza"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePizza}
          initialValues={pizza}
          onSubmit={async (values) => {
            try {
              const updated = await updatePizzaMutation({
                id: pizza.id,
                ...values,
              })
              await setQueryData(updated)
              await router.push(Routes.ShowPizzaPage({ pizzaId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditPizzaPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPizza />
      </Suspense>

      <p>
        <Link href={Routes.PizzasPage()}>
          <a>Pizzas</a>
        </Link>
      </p>
    </div>
  )
}

EditPizzaPage.authenticate = false
EditPizzaPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPizzaPage
