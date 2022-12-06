import { GridContainer } from "../sets/styled";
import { ActionsOptionProvider } from "../utilities/actions-option/context/provider";

import { TTerm } from "~/types/endpoints";
import { TermCard } from "./term-card";

const options = {
  edit: false,
  delete: false,
  move: false,
};

export const Terms = ({ terms }: { terms: TTerm[] }) => {
  return (
    <GridContainer>
      {terms.map((term) => (
        <ActionsOptionProvider key={term.id} options={options}>
          <TermCard term={term} key={term.id} />
        </ActionsOptionProvider>
      ))}
    </GridContainer>
  );
};
