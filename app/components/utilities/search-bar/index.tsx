import SearchIcon from "remixicon-react/SearchLineIcon";
import CancelIcon from "remixicon-react/CloseCircleFillIcon";
import clsx from "clsx";
import { Form } from "@remix-run/react";

import { Input } from "../inputs";
import {
  searchBarIcon,
  searchbarContainer,
  searchInput,
  searchCancelIcon,
} from "./styled";
import { useSearch } from "~/hooks/useSearch";

export const SearchBar = () => {
  const {
    searchState,
    cancel,
    debouncedChangeHandler,
    setSearchState,
    handleCancelEnvent,
  } = useSearch();

  return (
    <Form
      className={searchbarContainer}
      method="get"
      onChange={debouncedChangeHandler}
    >
      <Input
        type="text"
        name="search"
        placeholder="Start type to look up a word... "
        value={searchState}
        classes={searchInput}
        onChange={(event) => setSearchState(event.target.value)}
      />
      {cancel ? (
        <CancelIcon
          size="30"
          className={clsx(searchBarIcon, searchCancelIcon)}
          onClick={handleCancelEnvent}
        />
      ) : (
        <SearchIcon size="30" className={searchBarIcon} />
      )}
    </Form>
  );
};
