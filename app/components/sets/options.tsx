import { useCallback, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { Dropdown } from "../utilities/dropdown";
import { Box, Container } from "../utilities/layout";
import { dropDownSlot } from "../header/styled";
import { optionsContainer } from "./styled";
import { EditSet } from "../edit-set";

export type TActionType = "edit" | "delete";

const setOptions: { label: string; actionType: TActionType }[] = [
  { label: "Edit", actionType: "edit" },
  { label: "Delete", actionType: "delete" },
];

export const Options = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string | null;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedModal, setIsOpenedModal] = useState({
    edit: false,
    delete: false,
  });

  const toggleIsOpened = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsOpened((prevState) => !prevState);
  };

  const toggleIsOpenedModal = useCallback(
    (actionType: TActionType) =>
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setIsOpenedModal((prevState) => ({
          ...prevState,
          [actionType]: !prevState[actionType],
        }));
        setIsOpened(false);
      },
    []
  );

  return (
    <Container classes={optionsContainer}>
      <EllipsisVerticalIcon className="w-6 h-6" onClick={toggleIsOpened} />
      <Dropdown isOpened={isOpened} setIsOpened={setIsOpened}>
        {setOptions.map((option) => (
          <Box
            key={option.actionType}
            classes={dropDownSlot}
            onClick={toggleIsOpenedModal(option.actionType as TActionType)}
          >
            {option.label}
          </Box>
        ))}
      </Dropdown>
      {isOpenedModal.edit ? (
        <EditSet
          id={id}
          title={title}
          description={description}
          setIsOpenedModal={setIsOpenedModal}
        />
      ) : null}
      {/* {isOpenedModal.delete ? <DeleteSet /> : null} */}
    </Container>
  );
};
