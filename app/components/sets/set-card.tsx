import { Link } from "@remix-run/react";

import { customDate } from "~/utils/helpers";
import { Card } from "../utilities/card";
import { Paragraph, SubTitle, Title } from "../utilities/Typography";
import { Box } from "../utilities/layout";
import { descriptionClasses, headerClasses } from "./styled";
import { useActionsOption } from "../utilities/actions-option/context";
import { ActionsOption } from "./actions-option";

import type { TSet } from "~/types/endpoints";

export const SetCard = ({ set }: { set: TSet }) => {
  const {
    state: { isBinned },
  } = useActionsOption();

  return (
    <Card isbinned={isBinned ? isBinned.toString() : undefined}>
      <ActionsOption set={set} />
      <Link prefetch="intent" to={`sets/${set.id}`}>
        <Box classes={headerClasses}>
          <Title>{set.title}</Title>
          <SubTitle>Latest update: {customDate(set.updatedAt)}</SubTitle>
        </Box>
        <Box classes={descriptionClasses}>
          <Paragraph>{set.description}</Paragraph>
        </Box>
      </Link>
    </Card>
  );
};
