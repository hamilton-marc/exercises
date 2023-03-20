import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import createPizza from "src/pizzas/mutations/createPizza"
import { PizzaForm, FORM_ERROR } from "src/pizzas/components/PizzaForm"

const NewPizzaPage = () => {
  const router = useRouter()
  const [createPizzaMutation] = useMutation(createPizza)

  return (
    <Layout title={"Create New Pizza"}>
      <h1>Create New Pizza</h1>

      <PizzaForm
        submitText="Create Pizza"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePizza}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const pizza = await createPizzaMutation(values)
            await router.push(Routes.ShowPizzaPage({ pizzaId: pizza.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.PizzasPage()}>
          <a>Pizzas</a>
        </Link>
      </p>
    </Layout>
  )
}

NewPizzaPage.authenticate = false

export default NewPizzaPage
