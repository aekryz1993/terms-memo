import { useLoaderData } from "@remix-run/react";

import { GridContainer } from "./styled";
import { SetCard } from "./set-card";
import { Pagination } from "./pagination";
import { useSetContext } from "~/context/set";

import type { SetsLoaderData } from "~/types/data";

export const Sets = () => {
  const { totalPages } = useLoaderData<SetsLoaderData>();

  const {
    state: { currentSets },
  } = useSetContext();

  return (
    <>
      {currentSets.length === 0 ? (
        <p>There is any set yet. Add your first set.</p>
      ) : (
        <GridContainer>
          {currentSets.map((set) => (
            <SetCard set={set} key={set.id} />
          ))}
        </GridContainer>
      )}
      <Pagination totalPages={totalPages} />
    </>
  );
};
