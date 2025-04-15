import { Env, Winery } from "../types";
async function createWineryDetail(
  request: Request,
  env: Env,
  ct: ExecutionContext,
  ApifyResponse: Winery[],
  wineryIds: string[],
) {
  const list = ApifyResponse.map(
    (
      {
        title,
        street,
        city,
        postalCode,
        website,
        phoneUnformatted: phone,
        openingHours,
        location,
        placeId,
        reviews,
      },
      index,
    ) => {
      return {
        id: wineryIds[index],
        title,
        street,
        city,
        postalCode,
        website,
        phone,
        openingHours,
        location,
        placeId,
        lastUpdated: new Date().toJSON(),
        reviews: reviews.map(
          ({ stars: rating, publishedAtDate, responseFromOwnerText, text }) => {
            return {
              rating,
              timestamp: Math.round(Date.parse(publishedAtDate) / 1000),
              responseFromOwnerText,
              text,
            };
          },
        ),
      };
    },
  );
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${env.KV_NAMESPACE_ID}/bulk`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${env.CLOUDFLARE_KEY}`,
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(
        list.map((winery) => {
          return {
            expiration_ttl: 60 * 60 * 24 * 30,
            key: winery.id,
            value: JSON.stringify(winery),
          };
        }),
      ),
    },
  );
  console.log(list[1]);
  const result = await response.json();
  return result;
}
export default createWineryDetail;
