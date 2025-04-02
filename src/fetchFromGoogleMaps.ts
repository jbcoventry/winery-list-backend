import { Env, Winery, WineryWithID } from "./types";
async function fetchFromGoogleMaps(
  request: Request,
  env: Env,
  wineryId: string | undefined,
) {
  const data: WineryWithID[] | null = await env.kv.get("list", {
    type: "json",
  });
  if (data === null) {
    throw new Error("KV fetch failed");
  }

  const winery = data.filter((w) => w.id == wineryId).pop();
  if (winery === undefined) {
    throw new Error("winery not found");
  }
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/staticmap?center=${winery.location?.lat},${winery.location?.lng}&zoom=16&size=400x400&markers=color:red%7C-32.7739908,151.3115048&key=${env.GOOGLE_MAPS_KEY}&scale=2`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error(`unexpected response ${response.status}`);
  }
  return await response.blob();
}
export default fetchFromGoogleMaps;
