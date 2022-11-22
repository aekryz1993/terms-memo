import { Outlet, useLoaderData } from "@remix-run/react";

import { Pagination } from "./pagination";

import type { SetsLoaderData } from "~/types/data";

export const HomeLayout = () => {
  return (
    <>
      <Outlet />
      <Pagination />
    </>
  );
};
