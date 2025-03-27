import createIndividualWineryAPIResponses from "./createIndividualWineryAPIResponses";
import fetchFromApify from "./fetchFromApify";
import createWineryList from "./createWineryList";
import { Env, Winery } from "./types";
import idMaker from "./idMaker";

export default {
  async fetch(
    request: Request,
    env: Env,
    ct: ExecutionContext,
  ): Promise<Response> {
    if (request.url.includes(`${env.APIFY_HOOK_URL_KEY}`)) {
      const ApifyResponse = await fetchFromApify(request, env);
      const wineryIds = idMaker(ApifyResponse);
      await createWineryList(request, env, ct, ApifyResponse, wineryIds);

      await createIndividualWineryAPIResponses(
        request,
        env,
        ct,
        ApifyResponse,
        wineryIds,
      );

      return new Response("url key detected and KV updated", { status: 200 });
    }
    if (request.url.includes("wineries/")) {
      const wineryId = request.url.split("/").pop();
      console.log(wineryId);
      const data = await env.kv.get("list", { type: "json" });
      console.log(data);
      // TODO: handle error in next line when no winery with id `wineryId` exists
      const winery = data.filter((w) => w.id == wineryId).pop();
      const responseData = JSON.stringify(winery);
      return new Response(responseData, {
        status: 200,
        headers: { "content-type": "application/json;charset=UTF-8" },
      });
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
