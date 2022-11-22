import { Container } from "../utilities/layout";

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className="px-8 pt-12">{children}</main>;
};
