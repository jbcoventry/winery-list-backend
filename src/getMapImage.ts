import { Env, Winery, WineryWithID } from "./types";

async function getMapImage(request: Request, env: Env, ct: ExecutionContext) {
  const wineryId = request.url.split("/").pop();
  const data = await fetchFromGoogleMaps(request, env, wineryId);
  // Fix below error
  return new Response(data, {
    status: 200,
    headers: {
      "content-type": "image/png",
    },
  });
}

export default getMapImage;
