import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { Dropdown } from "../dropdown";
import { Container } from "../layout";
import { optionsContainer } from "./styled";
import { useActionsOption } from "./context";
import React from "react";

export const ActionsOptionLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { state, toggleOpenOptions, closeOptions } = useActionsOption();

  const { isOpened } = state;

  const handleToggleOpenOptions = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    toggleOpenOptions();
  };

  return (
    <Container classes={optionsContainer}>
      <EllipsisVerticalIcon
        className="w-6 h-6"
        onClick={handleToggleOpenOptions}
      />
      <Dropdown isOpened={isOpened} handleClose={closeOptions}>
        {children}
      </Dropdown>
    </Container>
  );
};
