import fetchActorResults from "./fetchActorResults";
import sendToKV from "./sendToKV";

export default {
  async fetch(request, env, ctx) {
    //Chrome always requests a favicon unless site has one cached or you return 404.
    if (request.url.includes("favicon.ico"))
      return new Response(null, { status: 404 });
    if (request.url.includes(`${env.APIFY_HOOK_URL_KEY}`)) {
      const data = await fetchActorResults(request, env, ctx);
      await sendToKV(request, env, ctx, data);
      return new Response("url key detected", { status: 200 });
    }
    if (request.url.includes("?query=")) {
      const url = new URL(request.url);
      const query = url.searchParams.get("query");
      const result = await env.kv.get(query, { type: "json" });
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
    }
    return new Response("query needed", {
      status: 200,
    });
  },
};
