import fetchActorResults from "./fetchActorResults";
import sendToKV from "./sendToKV";

export default {
  async fetch(request, env, ctx) {
    //Chrome always requests a favicon unless site has one cached or you return 404.
    if (request.url.includes("favicon.ico"))
      return new Response("no favicon", { status: 404 });
    const data = await fetchActorResults(request, env, ctx);
    await sendToKV(request, env, ctx, data);
    return new Response("Done");
  },
};
