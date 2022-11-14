import { expect } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import React from "react";
import { usePortal } from "~/hooks/usePortal";

describe("USE_PORTAL", () => {
  it("usePortal should return a Portal element and add it to the dom", async () => {
    // const useEffectSpy = jest
    //   .spyOn(React, "useEffect")
    //   .mockImplementation((fn) => fn());

    // const useRefSpy = jest.spyOn(React, "useRef");

    const { result, rerender, unmount } = await renderHook(
      ({ initialValue }) => usePortal(initialValue),
      {
        initialProps: { initialValue: "id" },
      }
    );

    expect(result.current.toString()).toBe("[object HTMLDivElement]");

    // expect(useEffectSpy).toBeCalledTimes(1);

    // await rerender({ initialValue: "id" });

    // expect(useEffectSpy).toBeCalledTimes(2);

    // expect(useRefSpy.mock.results[0].value.current.toString()).toBe(
    //   "[object HTMLDivElement]"
    // );

    await unmount();

    // // initial effect
    // expect(effectCounter).toBe(1);

    // // from item === {id: 'old_id'} to item === {id: 'old_id'} (memo equels true)
    // rerender({ initialValue: "old_id" });
    // // memoItem wasn't updated, so the effect wasn't applied
    // expect(effectCounter).toBe(1);

    // // from item === {id: 'old_id'} to item === {id: 'new_id'} (memo equels false)
    // rerender({ initialValue: "old_id" });
    // // memoItem was updated, so the effect was applied
    // expect(effectCounter).toBe(2);
  });
});
