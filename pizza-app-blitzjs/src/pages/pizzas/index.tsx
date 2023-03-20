import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import getPizzas from "src/pizzas/queries/getPizzas";

const ITEMS_PER_PAGE = 100;

export const PizzasList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ pizzas, hasMore }] = usePaginatedQuery(getPizzas, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <Link href={Routes.ShowPizzaPage({ pizzaId: pizza.id })}>
              <a>{pizza.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const PizzasPage = () => {
  return (
    <Layout>
      <Head>
        <title>Pizzas</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPizzaPage()}>
            <a>Create Pizza</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PizzasList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default PizzasPage;
