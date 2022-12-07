import clsx from "clsx";

interface TBoxProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  classes?: string;
}

interface TGridContainerProps extends React.ComponentProps<"ul"> {
  children: React.ReactNode;
}

const gridContainerclsx =
  "grid gap-4 grid-cols-1 text-direction-ltr pb-10 select-none";
const smGgridContainerclsx = "sm:grid-cols-2";
const lgGridContainerclsx = "lg:gap-8 lg:grid-cols-3";
const xlGridContainerclsx = "xl:gap-10 xl:grid-cols-4";

const GridContainer = (props: TGridContainerProps) => {
  const { children, className, ...ulProps } = props;

  return (
    <ul
      {...ulProps}
      className={clsx(
        className,
        gridContainerclsx,
        lgGridContainerclsx,
        smGgridContainerclsx,
        xlGridContainerclsx
      )}
    >
      {children}
    </ul>
  );
};

const Box = (props: TBoxProps) => {
  const { children, classes, className, ...divProps } = props;

  return (
    <div {...divProps} className={clsx([classes, className])}>
      {children}
    </div>
  );
};

const Container = (props: TBoxProps) => <Box {...props}>{props.children}</Box>;

const VStack = ({
  children,
  classes,
}: {
  children: React.ReactNode;
  classes?: string;
}) => <Box classes={clsx([classes, "flex flex-row"])}>{children}</Box>;

const HStack = ({
  children,
  classes,
}: {
  children: React.ReactNode;
  classes?: string;
}) => <Box classes={clsx([classes, "flex flex-col"])}>{children}</Box>;

const centerElement = "flex justify-center items-center";
const centerVertically = `${clsx(centerElement, "flex-row")}`;
const centerHorizontally = `${clsx(centerElement, "flex-col")}`;

export {
  Container,
  Box,
  VStack,
  HStack,
  GridContainer,
  centerVertically,
  centerHorizontally,
};
