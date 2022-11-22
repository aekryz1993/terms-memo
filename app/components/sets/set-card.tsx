import { customDate } from "~/utils/helpers";
import { Card } from "../utilities/card";
import { Paragraph, SubTitle, Title } from "../utilities/Typography";
import { Box } from "../utilities/layout";
import { descriptionClasses, headerClasses } from "./styled";

import type { TSet } from "~/types/endpoints";

export const SetCard = ({ set }: { set: TSet }) => {
  return (
    <Card>
      <Box classes={headerClasses}>
        {process.env.NODE_ENV === "development" ? (
          <Title>{set.id}</Title>
        ) : null}
        <Title>{set.title}</Title>
        <SubTitle>Latest update: {customDate(set.updatedAt)}</SubTitle>
      </Box>
      <Box classes={descriptionClasses}>
        <Paragraph>{set.description}</Paragraph>
      </Box>
    </Card>
  );
};
