import { Env, Winery } from "../types";
async function createWineryList(
  request: Request,
  env: Env,
  ct: ExecutionContext,
  ApifyResponse: Winery[],
  wineryIds: string[],
) {
  const list = ApifyResponse.map(({ title, reviews }, index) => {
    return {
      id: wineryIds[index],
      title,
      reviews: reviews.map(({ stars: rating, publishedAtDate }) => {
        return {
          rating,
          timestamp: Math.round(Date.parse(publishedAtDate) / 1000),
        };
      }),
    };
  });

  await env.winery_data.put("list", JSON.stringify(list), {
    expirationTtl: 60 * 60 * 24 * 30,
  });
  await env.winery_data.put(
    "lastUpdated",
    JSON.stringify(new Date().toJSON()),
    {
      expirationTtl: 60 * 60 * 24 * 30,
    },
  );
}
export default createWineryList;
