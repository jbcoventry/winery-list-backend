import createIndividualWineryAPIResponses from "./createIndividualWineryAPIResponses";
import fetchFromApify from "./fetchFromApify";
import createWineryList from "./createWineryList";

export default {
  async fetch(request, env, ctx) {
    if (request.url.includes(`${env.APIFY_HOOK_URL_KEY}`)) {
      const data = await fetchFromApify(request, env);
      await createWineryList(request, env, ctx, data);
      await createIndividualWineryAPIResponses(request, env, ctx, data);
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
