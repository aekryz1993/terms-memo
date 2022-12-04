import { Outlet } from "@remix-run/react";
import { LevelsNav } from "../levels";
import { AddTerm } from "../terms/add-term";
import { Set } from "./set";

export const SetLayout = () => {
  return (
    <>
      <AddTerm />
      <Set />
      <LevelsNav />
      <Outlet />
    </>
  );
};
