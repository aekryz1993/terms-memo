import clsx from "clsx";
import React from "react";

interface TBoxProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  newClasses: string;
}

const Box = (props: TBoxProps) => {
  const { children, newClasses, className, ...divProps } = props;

  return (
    <div {...divProps} className={clsx([className, newClasses])}>
      {children}
    </div>
  );
};

const Container = (props: TBoxProps) => <Box {...props}>{props.children}</Box>;

const VStack = ({
  children,
  newClasses,
}: {
  children: React.ReactNode;
  newClasses?: string;
}) => <Box newClasses={clsx([newClasses, "flex flex-row"])}>{children}</Box>;

const HStack = ({
  children,
  newClasses,
}: {
  children: React.ReactNode;
  newClasses?: string;
}) => <Box newClasses={clsx([newClasses, "flex flex-col"])}>{children}</Box>;

export { Container, Box, VStack, HStack };
