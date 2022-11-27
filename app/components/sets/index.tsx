import { useLoaderData } from "@remix-run/react";

import { layoutContainer } from "./styled";
import { Pagination } from "./pagination";
import { SearchBar } from "./search-bar";
import { Container } from "../utilities/layout";
import { Sets } from "./sets";
import { AddSet } from "../add-set";

import type { SetsLoaderData } from "~/types/data";

export const SetLayout = () => {
  const { sets } = useLoaderData<SetsLoaderData>();

  return (
    <>
      <AddSet />
      <Container classes={layoutContainer}>
        <SearchBar />
        {sets?.length === 0 ? (
          <p>There is any set yet. Add your first set.</p>
        ) : (
          <>
            <Sets sets={sets} />
            <Pagination />
          </>
        )}
      </Container>
    </>
  );
};
