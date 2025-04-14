import { Env, Winery } from "../types";
async function fetchFromApify(request: Request, env: Env): Promise<Winery[]> {
  const url = new URL(
    `https://api.apify.com/v2/datasets/${env.APIFY_DATASET_ID}/items`,
  );
  url.searchParams.append("format", "json");
  url.searchParams.append("clean", "1");
  url.searchParams.append("status", "SUCCEEDED");
  url.searchParams.append(
    "fields",
    "title,street,city,postalCode,website,phoneUnformatted,location,openingHours,placeId,reviews",
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      authorization: `bearer ${env.APIFY_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`unexpected response ${response.status}`);
  }
  return await response.json();
}
export default fetchFromApify;
