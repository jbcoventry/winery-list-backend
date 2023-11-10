import fetchFromApify from "./fetchFromApify";
import sendToKV from "./sendToKV";

export default {
  async fetch(request, env, ctx) {
    //Chrome always requests a favicon unless site has one cached or you return 404.
    if (request.url.includes("favicon.ico"))
      return new Response(null, { status: 404 });
    if (request.url.includes(`${env.APIFY_HOOK_URL_KEY}`)) {
      console.time("fetchFromApify");
      const data = await fetchFromApify(request, env);
      console.timeEnd("fetchFromApify");
      console.time("sendToKV");
      await sendToKV(request, env, ctx, data);
      console.timeEnd("sendToKV");
      return new Response("url key detected and KV updated", { status: 200 });
    }
    if (request.url.includes("list")) {
      const data = await env.kv.get("list", { type: "json" });
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
    }
    if (request.url.includes("reviewsText")) {
      const data = await env.kv.get("reviewsText", { type: "json" });
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
    }
    if (request.url.includes("lastUpdated")) {
      const data = await env.kv.get("lastUpdated", { type: "json" });
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
    }
    return new Response("query needed!", {
      status: 200,
    });
  },
};
