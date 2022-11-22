import { useLoaderData } from "@remix-run/react";
import PreviousIcon from "remixicon-react/ArrowLeftSLineIcon";
import NextIcon from "remixicon-react/ArrowRightSLineIcon";
import MoreIcon from "remixicon-react/MoreFillIcon";
import clsx from "clsx";

import { Box, Container } from "../utilities/layout";
import {
  paginationRoot,
  paginationIconItem,
  paginationItem,
  paginationContainer,
  paginationItemLight,
  paginationItemDark,
  selectedPage,
  disableIcon,
} from "./styled";

import type { RemixiconReactIconComponentType } from "remixicon-react";
import { Children } from "react";
import { useSetContext } from "~/context/set";
import { useFetchSets } from "~/hooks/set/useFetchSets";

interface TPaginationProps {
  totalPages: number;
}

const itemClasses = (current?: number, target?: number) =>
  clsx(
    paginationItem,
    paginationItemLight,
    paginationItemDark,
    current && target && current === target ? selectedPage : null
  );

const PageItem = ({
  pageNumber,
  currentPage,
  onClick,
}: {
  pageNumber: number;
  currentPage: number;
  onClick: () => void;
}) => (
  <Box classes={itemClasses(currentPage, pageNumber)} onClick={onClick}>
    <span className={paginationIconItem}>{pageNumber}</span>
  </Box>
);

const CurrentPageonTheStart = ({
  currentPage,
  handleChange,
}: {
  currentPage: number;
  handleChange: (pageNumber: number) => void;
}) => (
  <>
    {currentPage < 4 ? (
      <>
        {Children.map([...Array(3)], (_, index) => (
          <PageItem
            pageNumber={index + 2}
            currentPage={currentPage}
            onClick={() => handleChange(index + 2)}
          />
        ))}
      </>
    ) : null}
  </>
);

const CurrentPageOnTheCenter = ({
  currentPage,
  totalPages,
  handleChange,
}: {
  currentPage: number;
  totalPages: number;
  handleChange: (pageNumber: number) => void;
}) => (
  <>
    {currentPage >= 4 && totalPages - currentPage > 0 ? (
      <>
        {Children.map([...Array(4)], (_, index) => (
          <PageItem
            pageNumber={currentPage + (index - 2)}
            currentPage={currentPage}
            onClick={() => handleChange(currentPage + (index - 2))}
          />
        ))}
      </>
    ) : null}
  </>
);

const CurrentPageOnTheEnd = ({
  currentPage,
  totalPages,
  handleChange,
}: {
  currentPage: number;
  totalPages: number;
  handleChange: (pageNumber: number) => void;
}) => (
  <>
    {currentPage === totalPages ? (
      <>
        {Children.map([...Array(4)], (_, index) => (
          <PageItem
            pageNumber={totalPages + (index - 3)}
            currentPage={currentPage}
            onClick={() => handleChange(totalPages + (index - 3))}
          />
        ))}
      </>
    ) : null}
  </>
);

const Dots = ({ condition }: { condition: boolean }) => (
  <>
    {condition ? (
      <Box classes={itemClasses()}>
        <MoreIcon size="24" />
      </Box>
    ) : null}
  </>
);

const DirectionItem = ({
  Icon,
  onClick,
  condition,
}: {
  Icon: RemixiconReactIconComponentType;
  onClick: () => void;
  condition: boolean;
}) => (
  <Box
    classes={clsx(itemClasses(), condition ? disableIcon : null)}
    onClick={onClick}
  >
    <Icon size="24" />
  </Box>
);

export const Pagination = ({ totalPages }: TPaginationProps) => {
  const {
    state: { currentPage },
  } = useSetContext();

  const { handlePrev, handleNext, handleChange } = useFetchSets(totalPages);

  return (
    <Container id="pagination" classes={paginationRoot}>
      <Box classes={paginationContainer}>
        <DirectionItem
          Icon={PreviousIcon}
          onClick={handlePrev}
          condition={currentPage === 1}
        />

        <PageItem
          pageNumber={1}
          currentPage={currentPage}
          onClick={() => handleChange(1)}
        />

        <Dots condition={currentPage - 2 > 2} />

        <CurrentPageonTheStart
          currentPage={currentPage}
          handleChange={handleChange}
        />

        <CurrentPageOnTheCenter
          currentPage={currentPage}
          totalPages={totalPages}
          handleChange={handleChange}
        />

        <Dots condition={totalPages - currentPage > 2} />

        {totalPages - currentPage > 1 ? (
          <PageItem
            pageNumber={totalPages}
            currentPage={currentPage}
            onClick={() => handleChange(totalPages)}
          />
        ) : null}

        <CurrentPageOnTheEnd
          currentPage={currentPage}
          totalPages={totalPages}
          handleChange={handleChange}
        />

        <DirectionItem
          Icon={NextIcon}
          onClick={handleNext}
          condition={currentPage === totalPages}
        />
      </Box>
    </Container>
  );
};
