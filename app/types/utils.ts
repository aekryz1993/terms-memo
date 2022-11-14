import type {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

export type TMutateExecutor = (
  options?:
    | MutationFunctionOptions<
        any,
        OperationVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined
) => Promise<any>;

export interface TKeyValue {
  key: string;
  value: string | null | undefined;
}
