import { useLoaderData } from "@remix-run/react";

import { layoutContainer } from "../sets/styled";
import { Container } from "../utilities/layout";
import { SearchBar } from "../utilities/search-bar";
import { Pagination } from "../utilities/pagination";
import { Terms } from "./terms";

import type { TermsLoaderData } from "~/types/data";

export const TermsLayout = () => {
  const data = useLoaderData<TermsLoaderData>();

  return (
    <>
      <Container classes={layoutContainer}>
        <SearchBar />
        {data.terms?.length === 0 ? (
          <p>There is any term yet. Add your first term.</p>
        ) : (
          <>
            <Terms terms={data.terms} />
            <Pagination />
          </>
        )}
      </Container>
    </>
  );
};
