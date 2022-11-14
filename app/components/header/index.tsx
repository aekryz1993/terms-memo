import { useLoaderData } from "@remix-run/react";

import { Container, VStack } from "../utilities/layout";
import { Account } from "./account";
import { Language } from "./language";
import {
  containerClsx,
  Logo,
  rightSubContainerClsx,
  appearanceClsx,
} from "./styled";
import { ThemeSwithch } from "./theme-switch";

import type { RootLoaderData } from "~/types/data";

export const HeaderSection = () => {
  const { authInfo } = useLoaderData<RootLoaderData>();

  return (
    <Container newClasses={containerClsx}>
      <Logo />
      <VStack newClasses={rightSubContainerClsx}>
        <VStack newClasses={appearanceClsx}>
          <Language />
          <ThemeSwithch />
          {authInfo?.token ? <Account /> : null}
        </VStack>
      </VStack>
    </Container>
  );
};
