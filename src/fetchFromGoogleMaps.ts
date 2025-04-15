import { Env, Winery, WineryWithID } from "./types";
async function fetchFromGoogleMaps(request: Request, env: Env) {
  const wineryId = request.url.split("/").pop();
  if (wineryId === undefined) {
    return "no winery id provided";
  }
  const winery: WineryWithID | null = await env.winery_data.get(wineryId, {
    type: "json",
  });
  if (winery === null || winery === undefined) {
    throw new Error("KV fetch failed");
  }

  console.log(winery);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/staticmap?center=${winery.location?.lat},${winery.location?.lng}&zoom=16&size=400x400&key=${env.GOOGLE_MAPS_KEY}&scale=2`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(`unexpected response ${response.status}`);
  }
  return await response.blob();
}
export default fetchFromGoogleMaps;
