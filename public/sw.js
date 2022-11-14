self.addEventListener("install", function (e) {
  self.skipWaiting();
});

// self.addEventListener("activate", (event) => {
//   event.waitUntil(async () => {
//     const subscriptions = await self.registration.cookies.getSubscriptions();
//     await self.registration.cookies.unsubscribe(subscriptions);

//     await self.registration.cookies.subscribe([
//       {
//         name: "theme",
//       },
//     ]);
//   });
// });

// self.addEventListener("cookiechange", (event) => {
//   console.log(event);
// });

// self.addEventListener("message", ({ data, source: { id } }) => {
self.addEventListener(
  "message",
  async ({ data, source: { id, visibilityState, focused } }) => {
    // console.log(await e.currentTarget.registration.cookies.getSubscriptions());
    // console.log(await e.currentTarget.cookieStore.getAll());
    self.clients.matchAll().then((clients) => {
      const firstClientId = clients[0].id;
      // if (clients.length > 1) clients[0].postMessage({ ...data });
      clients.forEach((client) => {
        if (client.id !== firstClientId) client.postMessage({ ...data });
        // if (client.id === id) {
        //   if (client.visibilityState === "visible")
        //     client.postMessage({ visibilityState, focused });
        //   if (client.visibilityState === "hidden")
        //     client.postMessage({ ...data, visibilityState, focused });
        // }
        //
      });
    });
  }
);

self.addEventListener("fetch", ({ clientId }) => {
  self.clients.matchAll().then((clients) => {
    if (clients[clients.length - 1].id === clientId)
      clients[0].postMessage({ sender: true });
  });
});
