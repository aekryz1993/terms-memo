import { Outlet } from "@remix-run/react";
import { LevelsNav } from "./levels-nav";

export const SetLayout = () => {
  return (
    <>
      <LevelsNav />
      <Outlet />
    </>
  );
};
