import { useLoaderData } from "@remix-run/react";

import { GridContainer, layoutContainer } from "./styled";
import { SetCard } from "./set-card";
import { Pagination } from "./pagination";
import { SearchBar } from "./search-bar";
import { Container } from "../utilities/layout";

import type { SetsLoaderData } from "~/types/data";

export const SetLayout = () => {
  const { sets } = useLoaderData<SetsLoaderData>();

  return (
    <Container classes={layoutContainer}>
      <SearchBar />
      {sets?.length === 0 ? (
        <p>There is any set yet. Add your first set.</p>
      ) : (
        <>
          <GridContainer>
            {sets.map((set) => (
              <SetCard set={set} key={set.id} />
            ))}
          </GridContainer>
          <Pagination />
        </>
      )}
    </Container>
  );
};
