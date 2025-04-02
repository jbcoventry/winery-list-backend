import createIndividualWineryAPIResponses from "./updateData/createWineryDetail";
import fetchFromApify from "./updateData/fetchFromApify";
import createWineryList from "./updateData/createWineryList";
import { Env, Winery, WineryWithID } from "./types";
import idMaker from "./updateData/idMaker";
import fetchFromGoogleMaps from "./fetchFromGoogleMaps";
import updateData from "./updateData/updateData";
import getWineryByID from "./getWineryByID";
import getLastUpdated from "./getLastUpdated";
import getMapImage from "./getMapImage";
import getWineryList from "./getWineryList";

export default {
  async fetch(
    request: Request,
    env: Env,
    ct: ExecutionContext,
  ): Promise<Response> {
    //This is called by Apify when it updates review data. Scheduled via a cron job on Apify site.
    if (request.url.includes(`${env.APIFY_HOOK_URL_KEY}`))
      return updateData(request, env, ct);

    if (request.url.includes("winery/")) {
      return getWineryByID(request, env, ct);
    }
    if (request.url.includes("map/")) {
      return getMapImage(request, env, ct);
    }
    if (request.url.includes("list")) {
      return getWineryList(request, env, ct);
    }
    if (request.url.includes("lastUpdated")) {
      return getLastUpdated(request, env, ct);
    }

    return new Response("query needed!", {
      status: 200,
    });
  },
};
