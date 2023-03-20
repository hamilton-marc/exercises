import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getTopping from "src/toppings/queries/getTopping"
import updateTopping from "src/toppings/mutations/updateTopping"
import { ToppingForm, FORM_ERROR } from "src/toppings/components/ToppingForm"

export const EditTopping = () => {
  const router = useRouter()
  const toppingId = useParam("toppingId", "number")
  const [topping, { setQueryData }] = useQuery(
    getTopping,
    { id: toppingId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateToppingMutation] = useMutation(updateTopping)

  return (
    <>
      <Head>
        <title>Edit Topping {topping.id}</title>
      </Head>

      <div>
        <h1>Edit Topping {topping.id}</h1>
        <pre>{JSON.stringify(topping, null, 2)}</pre>

        <ToppingForm
          submitText="Update Topping"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTopping}
          initialValues={topping}
          onSubmit={async (values) => {
            try {
              const updated = await updateToppingMutation({
                id: topping.id,
                ...values,
              })
              await setQueryData(updated)
              await router.push(Routes.ShowToppingPage({ toppingId: updated.id }))
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

const EditToppingPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTopping />
      </Suspense>

      <p>
        <Link href={Routes.ToppingsPage()}>
          <a>Toppings</a>
        </Link>
      </p>
    </div>
  )
}

EditToppingPage.authenticate = false
EditToppingPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditToppingPage
