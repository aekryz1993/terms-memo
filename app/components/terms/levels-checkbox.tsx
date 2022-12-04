import { LevelsCheckboxItems } from "./levels-checkbox-items";
import { Box, Container } from "../utilities/layout";
import { Paragraph } from "../utilities/Typography";
import {
  levelsNavClsx,
  levelsNavContainerClsx,
  levelsNavPlaceholder,
} from "./styled";

export const LevelsCheckBox = () => {
  return (
    <Box>
      <Paragraph classes={levelsNavPlaceholder}>
        Choose the term's level:
      </Paragraph>
      <Container classes={levelsNavContainerClsx}>
        <Box classes={levelsNavClsx}>
          <LevelsCheckboxItems />
        </Box>
      </Container>
    </Box>
  );
};
