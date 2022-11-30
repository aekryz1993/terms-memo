import type { RemixiconReactIconComponentType } from "remixicon-react";
import { Children } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import PreviousIcon from "remixicon-react/ArrowLeftSLineIcon";
import NextIcon from "remixicon-react/ArrowRightSLineIcon";
import MoreIcon from "remixicon-react/MoreFillIcon";
import clsx from "clsx";

import { Box } from "../utilities/layout";
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
import { Portal } from "../Portal";

import type { SetsLoaderData } from "~/types/data";

export const Pagination = () => {
  const { totalPages, currentPage, take } = useLoaderData<SetsLoaderData>();

  return (
    <Portal
      id="sets-pagination"
      rootClass={paginationRoot}
      clsx={paginationContainer}
    >
      <DirectionItem
        Icon={PreviousIcon}
        skip={currentPage - 2}
        take={take}
        preventCondition={currentPage - 2 < 0}
      />

      <PageItem pageNumber={1} currentPage={currentPage} skip={0} take={take} />

      <FewPages currentPage={currentPage} take={take} totalPages={totalPages} />

      <Dots condition={currentPage - 2 > 2 && totalPages > 5} />

      <CurrentPageOnTheStart
        currentPage={currentPage}
        take={take}
        totalPages={totalPages}
      />

      <CurrentPageOnTheCenter
        currentPage={currentPage}
        totalPages={totalPages}
        take={take}
      />

      <Dots condition={totalPages - currentPage > 2 && totalPages > 5} />

      {totalPages > 4 && totalPages - currentPage > 1 ? (
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
    </Portal>
  );
};

const itemClasses = (current?: number, target?: number) =>
  clsx(
    current && target && current === target
      ? selectedPage
      : clsx(paginationItemLight, paginationItemDark),
    paginationItem
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
}) => {
  const [params] = useSearchParams();
  const search = params.get("search");

  return (
    <Link
      to={
        search
          ? `?search=${search}&skip=${skip}&take=${take}`
          : `?skip=${skip}&take=${take}`
      }
      prefetch="intent"
      replace
      className={itemClasses(currentPage, pageNumber)}
    >
      <span className={paginationIconItem}>{pageNumber} </span>
    </Link>
  );
};

const FewPages = ({
  totalPages,
  currentPage,
  take,
}: {
  totalPages: number;
  currentPage: number;
  take: number;
}) => (
  <>
    {totalPages <= 4 && totalPages > 0
      ? Children.map([...Array(totalPages - 1)], (_, index) => (
          <PageItem
            pageNumber={index + 2}
            currentPage={currentPage}
            skip={take * (index + 1)}
            take={take}
          />
        ))
      : null}
  </>
);

const CurrentPageOnTheStart = ({
  currentPage,
  take,
  totalPages,
}: {
  currentPage: number;
  take: number;
  totalPages: number;
}) => (
  <>
    {totalPages > 4 && currentPage < 4 ? (
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
    {totalPages > 4 && currentPage === totalPages ? (
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
}) => {
  const [params] = useSearchParams();
  const search = params.get("search");

  return (
    <>
      {preventCondition ? (
        <Box
          classes={clsx(itemClasses(), preventCondition ? disableIcon : null)}
        >
          <Icon size="24" />
        </Box>
      ) : (
        <Link
          to={
            search
              ? `?search=${search}&skip=${take * skip}&take=${take}`
              : `?skip=${take * skip}&take=${take}`
          }
          prefetch="intent"
          replace
          className={clsx(itemClasses(), preventCondition ? disableIcon : null)}
        >
          <Icon size="24" />
        </Link>
      )}
    </>
  );
};
