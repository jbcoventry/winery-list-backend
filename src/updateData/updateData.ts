import fetchFromApify from "./fetchFromApify";
import createWineryList from "./createWineryList";
import idMaker from "./idMaker";
import { Env, Winery, WineryWithID } from "../types";
import createWineryDetail from "./createWineryDetail";

async function updateData(request: Request, env: Env, ct: ExecutionContext) {
  const ApifyResponse = await fetchFromApify(request, env);
  const wineryIds = idMaker(ApifyResponse);
  await createWineryList(request, env, ct, ApifyResponse, wineryIds);
  await createWineryDetail(request, env, ct, ApifyResponse, wineryIds);

  return new Response("url key detected and data successfully updated", {
    status: 200,
  });
}

export default updateData;
