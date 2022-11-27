import { SetCard } from "./set-card";
import { GridContainer } from "./styled";

import { TSet } from "~/types/endpoints";

export const Sets = ({ sets }: { sets: TSet[] }) => {
  return (
    <GridContainer>
      {sets.map((set) => (
        <SetCard set={set} key={set.id} />
      ))}
    </GridContainer>
  );
};
