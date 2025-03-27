import { Env, Winery } from "./types";
async function createWineryList(
  request: Request,
  env: Env,
  ct: ExecutionContext,
  ApifyResponse: Winery[],
  wineryIds: string[],
) {
  console.time("createWineryList ApifyResponse.map");

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
        lastUpdated: new Date().toJSON(),
        reviews: reviews.map(({ stars: rating, publishedAtDate }) => {
          return {
            rating,
            timestamp: Math.round(Date.parse(publishedAtDate) / 1000),
          };
        }),
      };
    },
  );
  console.timeEnd("createWineryList ApifyResponse.map");

  await env.kv.put("list", JSON.stringify(list), {
    expirationTtl: 60 * 60 * 24 * 30,
  });
  await env.kv.put("lastUpdated", JSON.stringify(new Date().toJSON()), {
    expirationTtl: 60 * 60 * 24 * 30,
  });
}
export default createWineryList;
