import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import getToppings from "src/toppings/queries/getToppings";

const ITEMS_PER_PAGE = 100;

export const ToppingsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ toppings, hasMore }] = usePaginatedQuery(getToppings, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {toppings.map((topping) => (
          <li key={topping.id}>
            <Link href={Routes.ShowToppingPage({ toppingId: topping.id })}>
              <a>{topping.name}</a>
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

const ToppingsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Toppings</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewToppingPage()}>
            <a>Create Topping</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ToppingsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ToppingsPage;
