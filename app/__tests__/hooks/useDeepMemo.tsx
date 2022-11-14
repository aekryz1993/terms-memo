import { expect } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useEffect } from "react";
import { compareObjectIdCallback, useDeepMemo } from "~/hooks/useDeepMemo";

describe("USE_DEEP_MEMO", () => {
  it("target memo value through compareObjectIdCallback", async () => {
    let effectCounter = 0;

    const { result, rerender } = renderHook(
      ({ initialValue }) => useDeepMemo(initialValue, compareObjectIdCallback),
      {
        initialProps: { initialValue: { id: "old_id" } },
      }
    );

    const { rerender: rerenderEffect } = renderHook(
      ({ initialValue }) =>
        useEffect(() => {
          effectCounter += 1;
        }, [initialValue]),
      { initialProps: { initialValue: result.current } }
    );

    // initial effect
    expect(effectCounter).toBe(1);

    // from item === {id: 'old_id'} to item === {id: 'old_id'} (memo equels true)
    rerender({ initialValue: { id: "old_id" } });
    rerenderEffect({ initialValue: result.current });
    // memoItem wasn't updated, so the effect wasn't applied
    expect(effectCounter).toBe(1);

    // from item === {id: 'old_id'} to item === {id: 'new_id'} (memo equels false)
    rerender({ initialValue: { id: "new_id" } });
    rerenderEffect({ initialValue: result.current });
    // memoItem was updated, so the effect was applied
    expect(effectCounter).toBe(2);
  });
});
