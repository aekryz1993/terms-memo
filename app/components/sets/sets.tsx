import { SetCard } from "./set-card";
import { GridContainer } from "./styled";

import { TSet } from "~/types/endpoints";
import { ActionsOptionProvider } from "../utilities/actions-option/context/provider";
import { useRef } from "react";

const options = {
  edit: false,
  delete: false,
};

export const Sets = ({ sets }: { sets: TSet[] }) => {
  return (
    <GridContainer>
      {sets.map((set) => (
        <ActionsOptionProvider key={set.id} options={options}>
          <SetCard set={set} />
        </ActionsOptionProvider>
      ))}
    </GridContainer>
  );
};
