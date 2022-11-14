import { PrimaryButton } from "../utilities/buttons";
import { useLoaderData } from "@remix-run/react";

import type { SetsLoaderData } from "~/types/data";

interface TProps {
  setIsOpenAddSet: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sets = ({ setIsOpenAddSet }: TProps) => {
  const { sets } = useLoaderData<SetsLoaderData>();

  return (
    <>
      {sets.length === 0 ? (
        <p>There is any set yet. Add your first set.</p>
      ) : (
        <ul>
          {sets.map((set) => (
            <li key={set.id}>
              <h3>{set.title}</h3>
              <p>{set.description}</p>
            </li>
          ))}
        </ul>
      )}
      <PrimaryButton type="button" onClick={() => setIsOpenAddSet(true)}>
        Add New Set
      </PrimaryButton>
    </>
  );
};
