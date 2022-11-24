import clsx from "clsx";

interface TBoxProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  classes?: string;
}

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

export { Container, Box, VStack, HStack };
