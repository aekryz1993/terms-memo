import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",

    // Use explicit `window.fetch` so tha outgoing requests
    // are captured and deferred until the Service Worker is ready.
    fetch: (...args) => fetch(...args),
  }),
});

export default client;
