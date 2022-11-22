import { useLazyQuery } from "@apollo/client";
import { useLoaderData } from "@remix-run/react";
import { useCallback } from "react";

import { TAKE, useSetContext } from "~/context/set";
import { SETS } from "~/endpoints/query/sets";
import { setContext } from "~/utils/helpers";

export const useFetchSets = (totalPages: number) => {
  const {
    state: { currentPage, setsByPage },
    persistFetchSetsRef,
    addSets,
    fetchSets,
  } = useSetContext();
  const { token } = useLoaderData();

  const [fetchSetsQuery] = useLazyQuery(SETS);

  const handlePrev = useCallback(() => {
    if (currentPage <= 1) return;
    if (setsByPage[currentPage - 1] !== undefined)
      fetchSets({ currentPage: currentPage - 1 });
    else
      fetchSetsQuery({
        variables: { skip: TAKE * (currentPage - 2), take: TAKE },
        context: setContext(token),
        onCompleted: (data) => {
          addSets({
            currentPage: data.fetchSets.currentPage,
            sets: data.fetchSets.sets,
          });
        },
        onError: (error) => {
          console.error(error.message);
        },
      });
  }, [currentPage, setsByPage, fetchSets, persistFetchSetsRef]);

  const handleNext = useCallback(() => {
    if (currentPage >= totalPages) return;
    if (setsByPage[currentPage + 1] !== undefined)
      fetchSets({ currentPage: currentPage + 1 });
    else
      fetchSetsQuery({
        variables: { skip: TAKE * currentPage, take: TAKE },
        context: setContext(token),
        onCompleted: (data) => {
          addSets({
            currentPage: data.fetchSets.currentPage,
            sets: data.fetchSets.sets,
          });
        },
        onError: (error) => {
          console.error(error.message);
        },
      });
  }, [currentPage, setsByPage, fetchSets, totalPages, persistFetchSetsRef]);

  const handleChange = useCallback(
    (pageNumber: number) => {
      if (currentPage === pageNumber) return;
      if (setsByPage[pageNumber] !== undefined)
        fetchSets({ currentPage: pageNumber });
      else
        fetchSetsQuery({
          variables: { skip: TAKE * (pageNumber - 1), take: TAKE },
          context: setContext(token),
          onCompleted: (data) => {
            addSets({
              currentPage: data.fetchSets.currentPage,
              sets: data.fetchSets.sets,
            });
          },
          onError: (error) => {
            console.error(error.message);
          },
        });
    },
    [currentPage, setsByPage, fetchSets, persistFetchSetsRef]
  );

  return { handlePrev, handleNext, handleChange };
};
