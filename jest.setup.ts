// import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/extend-expect";
import client from "./app/apollo-client";
import { server } from "./app/__mocks__/server";

// installGlobals();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: jest.fn(),
});

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "warn",
  })
);

beforeEach(() => {
  client.clearStore();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  jest.restoreAllMocks();
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => server.close());
