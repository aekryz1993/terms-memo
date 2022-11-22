import { useLoaderData } from "@remix-run/react";

import { GridContainer } from "./styled";
import { SetCard } from "./set-card";

import type { SetsLoaderData } from "~/types/data";

export const SetsLayout = () => {
  const { sets } = useLoaderData<SetsLoaderData>();

  return (
    <>
      {sets.length === 0 ? (
        <p>There is any set yet. Add your first set.</p>
      ) : (
        <GridContainer>
          {sets.map((set) => (
            <SetCard set={set} key={set.id} />
          ))}
        </GridContainer>
      )}
    </>
  );
};
