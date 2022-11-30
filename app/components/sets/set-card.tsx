import { useState } from "react";

import { customDate } from "~/utils/helpers";
import { Card } from "../utilities/card";
import { Paragraph, SubTitle, Title } from "../utilities/Typography";
import { Box } from "../utilities/layout";
import { descriptionClasses, headerClasses } from "./styled";
import { Options } from "./options";

import type { TSet } from "~/types/endpoints";

export const SetCard = ({ set }: { set: TSet }) => {
  const [isBinned, setIsBinned] = useState(false);

  return (
    <Card id={set.id} isbinned={isBinned ? isBinned.toString() : undefined}>
      <Options
        id={set.id}
        title={set.title}
        description={set.description}
        setIsBinned={setIsBinned}
      />
      <Box classes={headerClasses}>
        <Title>{set.title}</Title>
        <SubTitle>Latest update: {customDate(set.updatedAt)}</SubTitle>
      </Box>
      <Box classes={descriptionClasses}>
        <Paragraph>{set.description}</Paragraph>
      </Box>
    </Card>
  );
};
