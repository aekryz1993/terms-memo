import { useLoaderData, useParams, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import clsx from "clsx";

import { Portal } from "../Portal";
import { Container } from "../utilities/layout";
import { ClosePortalBtn } from "../utilities/close-portal-btn";
import { Form } from "../utilities/form";
import { levelBorderColor, levelContainerClsx } from "../levels/styled";
import { portalRootClsx } from "../utilities/actions-option/styled";
import { Title } from "../utilities/Typography";
import { portalContainertClsx } from "./styled";

import type { TTerm } from "~/types/endpoints";
import type { LevelsLoaderData } from "~/types/data";
import type { Dispatch } from "~/types/utils";

export const MoveTerm = ({
  term,
  handleClose,
}: {
  term: Required<Pick<TTerm, "id" | "levelId">>;
  handleClose: Dispatch;
}) => {
  const { levels } = useLoaderData<LevelsLoaderData>();
  const isSubmitRef = useRef(false);
  const transition = useTransition();

  const state = transition.state;

  useEffect(() => {
    if (state === "idle" && isSubmitRef.current) {
      isSubmitRef.current = false;
    } else if (state === "submitting") {
      isSubmitRef.current = true;
      handleClose();
    }
  }, [state, handleClose]);

  return (
    <Portal
      id="move-term"
      rootClass={portalRootClsx}
      clsx={portalContainertClsx}
    >
      <Title>Move The Term To:</Title>
      <ClosePortalBtn handleCloseEvent={handleClose} />
      <Container classes="pl-2 flex flex-col gap-4">
        {levels?.length
          ? levels.map((level) => (
              <LevelForm termId={term.id} key={level.id}>
                {term.levelId !== level.id ? (
                  <>
                    <input type="hidden" name="levelId" value={level.id} />
                    <button
                      type="submit"
                      className={clsx(
                        levelContainerClsx,
                        levelBorderColor[level.name],
                        "active:bg-bg-sel_lt dark:active:bg-bg-sel_dark active:text-white w-full text-left"
                      )}
                    >
                      {level.name}
                    </button>
                  </>
                ) : null}
              </LevelForm>
            ))
          : null}
      </Container>
    </Portal>
  );
};

const LevelForm = ({
  children,
  termId,
}: {
  children: React.ReactNode;
  termId: string;
}) => {
  const { setId } = useParams();
  return (
    <Form method="post">
      <input type="hidden" name="actionType" value="move" />
      <input type="hidden" name="setId" value={setId} />
      <input type="hidden" name="id" value={termId} />
      {children}
    </Form>
  );
};
