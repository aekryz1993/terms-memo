import { forbiddenError, invalid_token } from "~/__mocks__/mocks/auth";
import { expect } from "@jest/globals";
import { createSet } from "~/endpoints/mutation/set";
import {
  buildSet,
  createSetDataResponse,
  existSetError,
  newSet,
  newSetBody,
  sets,
} from "~/__mocks__/mocks/set";
import { fetchSets } from "~/endpoints/query/sets";

describe("CREATE SET", () => {
  let setsMock: any;

  beforeEach(() => {
    setsMock = [...sets];
  });

  afterEach(() => {
    while (sets.length > 0) {
      sets.pop();
    }
    sets.push(...setsMock);
  });
  const userId = "user_0";
  it("successfully created", async () => {
    const response = await createSet(newSetBody, `valid_token:${userId}`);

    expect(response.data.createSet).toEqual(
      createSetDataResponse(newSet, userId)
    );
  });

  it("forbidden request", async () => {
    try {
      await createSet(newSetBody, invalid_token);
    } catch (error: any) {
      expect(error.message).toBe(forbiddenError.message);
    }
  });

  it("set's name is already exist", async () => {
    try {
      await createSet(
        { title: sets[0].title, description: sets[0].description },
        `valid_token:${userId}`
      );
    } catch (error: any) {
      expect(error.message).toBe(existSetError.message);
    }
  });
});

describe("FETCH SETS", () => {
  let setsMock: any;

  beforeEach(() => {
    setsMock = [...sets];
    [...Array(5)].forEach((_, i) =>
      sets.push(
        buildSet({
          title: `set_${i + 1}`,
          description: `set_${i + 1}_description`,
          userId: "user_0",
        })
      )
    );
  });

  afterEach(() => {
    while (sets.length > 0) {
      sets.pop();
    }
    sets.push(...setsMock);
  });

  const userId = "user_0";

  it("successfully fetched", async () => {
    const response = await fetchSets(
      { skip: 0, take: 4 },
      `valid_token:${userId}`
    );

    expect(response.data.sets.length === 4).toBe(true);
  });

  it("forbidden request", async () => {
    try {
      fetchSets({ skip: 0, take: 4 }, "invalid_token");
    } catch (error: any) {
      expect(error.message).toBe(forbiddenError.message);
    }
  });
});
