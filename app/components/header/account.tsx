import { Fragment, useState } from "react";
import clsx from "clsx";
import AccountIcon from "remixicon-react/AccountCircleLineIcon";
import { Link } from "@remix-run/react";

import { appearanceBtnClsx, dropDownSlot } from "./styled";
import { Box } from "../utilities/layout";
import { Dropdown } from "../utilities/dropdown";

const accountOptions = [
  { label: "Setting", pathname: "setting" },
  { label: "Log Out", pathname: "logout" },
];

export const Account = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <button
      className={clsx(appearanceBtnClsx, isOpened && "z-50")}
      onClick={() => setIsOpened((prev) => !prev)}
    >
      <AccountIcon size="24" />

      <Dropdown isOpened={isOpened} setIsOpened={setIsOpened}>
        {accountOptions.map((option) => (
          <Fragment key={option.label}>
            {option.pathname === "logout" ? (
              <Box newClasses={dropDownSlot}>{option.label}</Box>
            ) : (
              <Link to={option.pathname}>
                <Box newClasses={dropDownSlot}>{option.label}</Box>
              </Link>
            )}
          </Fragment>
        ))}
      </Dropdown>
    </button>
  );
};
