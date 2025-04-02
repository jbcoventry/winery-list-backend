import fetchFromGoogleMaps from "./fetchFromGoogleMaps";
import { Env, Winery, WineryWithID } from "./types";

async function getMapImage(
  request: Request,
  env: Env,
  ct: ExecutionContext,
): Promise<Response> {
  const data = await fetchFromGoogleMaps(
    request,
    env,
    request.url.split("/").pop(),
  );
  return new Response(data, {
    status: 200,
    headers: {
      "content-type": "image/png",
    },
  });
}

export default getMapImage;
