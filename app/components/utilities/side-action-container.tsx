import { useCallback, useRef } from "react";
import clsx from "clsx";

import { Title } from "./Typography";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";
import { ControllerIcon } from "../add-set/ControllerIcon";

const container =
  "fixed z-40 shadow-2xl h-full w-[300px] md:w-[414px] xl:w-[820px] bg-bg-sec_lt dark:bg-bg-sec_dark transition-transform duration-1000 flex flex-col gap-12 px-4 py-12";
const closedContainer =
  "-translate-x-[280px] md:-translate-x-[390px] xl:-translate-x-[800px]";
const openedContainer = "translate-x-0";
const titleClsx = "text-3xl mx-auto font-black";

export const SideActionContainer = ({
  children,
  title,
  isOpened,
  setIsOpened,
}: {
  children: React.ReactNode;
  title: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const containerRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  useListenForOutsideClicks({ handleClose, isOpened, containerRef });

  return (
    <div
      className={clsx(container, isOpened ? openedContainer : closedContainer)}
      ref={containerRef}
    >
      <Title classes={titleClsx}>{title}</Title>
      {children}
      <ControllerIcon isOpened={isOpened} setIsOpened={setIsOpened} />
    </div>
  );
};
