import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import createTopping from "src/toppings/mutations/createTopping"
import { ToppingForm, FORM_ERROR } from "src/toppings/components/ToppingForm"

const NewToppingPage = () => {
  const router = useRouter()
  const [createToppingMutation] = useMutation(createTopping)

  return (
    <Layout title={"Create New Topping"}>
      <h1>Create New Topping</h1>

      <ToppingForm
        submitText="Create Topping"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTopping}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const topping = await createToppingMutation(values)
            await router.push(Routes.ShowToppingPage({ toppingId: topping.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ToppingsPage()}>
          <a>Toppings</a>
        </Link>
      </p>
    </Layout>
  )
}

NewToppingPage.authenticate = false

export default NewToppingPage
