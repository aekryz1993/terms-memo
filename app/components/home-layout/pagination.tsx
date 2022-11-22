import { Link, useLoaderData } from "@remix-run/react";
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
import { SetsLoaderData } from "~/types/data";

export const Pagination = () => {
  const { totalPages, currentPage, take } = useLoaderData<SetsLoaderData>();

  return (
    <Container id="pagination" classes={paginationRoot}>
      <Box classes={paginationContainer}>
        <DirectionItem
          Icon={PreviousIcon}
          skip={currentPage - 2}
          take={take}
          preventCondition={currentPage - 2 < 0}
        />

        <PageItem
          pageNumber={1}
          currentPage={currentPage}
          skip={0}
          take={take}
        />

        <Dots condition={currentPage - 2 > 2} />

        <CurrentPageonTheStart currentPage={currentPage} take={take} />

        <CurrentPageOnTheCenter
          currentPage={currentPage}
          totalPages={totalPages}
          take={take}
        />

        <Dots condition={totalPages - currentPage > 2} />

        {totalPages - currentPage > 1 ? (
          <PageItem
            pageNumber={totalPages}
            currentPage={currentPage}
            skip={take * (totalPages - 1)}
            take={take}
          />
        ) : null}

        <CurrentPageOnTheEnd
          currentPage={currentPage}
          totalPages={totalPages}
          take={take}
        />

        <DirectionItem
          Icon={NextIcon}
          skip={currentPage}
          take={take}
          preventCondition={currentPage === totalPages}
        />
      </Box>
    </Container>
  );
};

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
  skip,
  take,
}: {
  pageNumber: number;
  currentPage: number;
  skip: number;
  take: number;
}) => (
  <Link
    to={`?skip=${skip}&take=${take}`}
    prefetch="render"
    replace
    className={itemClasses(currentPage, pageNumber)}
  >
    <span className={paginationIconItem}>{pageNumber} </span>
  </Link>
);

const CurrentPageonTheStart = ({
  currentPage,
  take,
}: {
  currentPage: number;
  take: number;
}) => (
  <>
    {currentPage < 4 ? (
      <>
        {Children.map([...Array(3)], (_, index) => (
          <PageItem
            pageNumber={index + 2}
            currentPage={currentPage}
            skip={take * (index + 1)}
            take={take}
          />
        ))}
      </>
    ) : null}
  </>
);

const CurrentPageOnTheCenter = ({
  currentPage,
  totalPages,
  take,
}: {
  currentPage: number;
  totalPages: number;
  take: number;
}) => (
  <>
    {currentPage >= 4 && totalPages - currentPage > 0 ? (
      <>
        {Children.map([...Array(4)], (_, index) => (
          <PageItem
            pageNumber={currentPage + (index - 2)}
            currentPage={currentPage}
            skip={take * (currentPage + (index - 3))}
            take={take}
          />
        ))}
      </>
    ) : null}
  </>
);

const CurrentPageOnTheEnd = ({
  currentPage,
  totalPages,
  take,
}: {
  currentPage: number;
  totalPages: number;
  take: number;
}) => (
  <>
    {currentPage === totalPages ? (
      <>
        {Children.map([...Array(4)], (_, index) => (
          <PageItem
            pageNumber={totalPages + (index - 3)}
            currentPage={currentPage}
            skip={take * (totalPages + (index - 4))}
            take={take}
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
  skip,
  take,
  preventCondition,
}: {
  Icon: RemixiconReactIconComponentType;
  skip: number;
  take: number;
  preventCondition: boolean;
}) => (
  <>
    {preventCondition ? (
      <Box classes={clsx(itemClasses(), preventCondition ? disableIcon : null)}>
        <Icon size="24" />
      </Box>
    ) : (
      <Link
        to={`?skip=${take * skip}&take=${take}`}
        prefetch="render"
        replace
        className={clsx(itemClasses(), preventCondition ? disableIcon : null)}
      >
        <Icon size="24" />
      </Link>
    )}
  </>
);
