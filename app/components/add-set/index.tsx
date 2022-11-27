import clsx from "clsx";
import { useState } from "react";

import { closedContainer, container, openedContainer, title } from "./styled";
import { Box } from "../utilities/layout";
import { ControllerIcon } from "./ControllerIcon";
import { AddForm } from "./add-form";
import { Title } from "../utilities/Typography";

export const AddSet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box classes={clsx(container, isOpen ? openedContainer : closedContainer)}>
      <Title classes={title}>Add a New Set</Title>
      <AddForm setIsOpen={setIsOpen} />
      <ControllerIcon isOpen={isOpen} setIsOpen={setIsOpen} />
    </Box>
  );
};
