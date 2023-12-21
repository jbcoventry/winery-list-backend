async function createWineryList(request, env, ctx, data) {
  const list = data.map(
    (
      {
        title,
        street,
        city,
        postalCode,
        website,
        phoneUnformatted: phone,
        openingHours,
        reviews,
      },
      index
    ) => {
      return {
        id: index,
        title,
        street,
        city,
        postalCode,
        website,
        phone,
        openingHours,
        lastUpdated: new Date().toJSON(),
        reviews: reviews.map(({ stars: rating, publishedAtDate }) => {
          return {
            rating,
            timestamp: Math.round(Date.parse(publishedAtDate) / 1000),
          };
        }),
      };
    }
  );
  await env.kv.put("list", JSON.stringify(list), {
    expirationTtl: 60 * 60 * 24 * 30,
  });
  await env.kv.put("lastUpdated", JSON.stringify(new Date().toJSON()), {
    expirationTtl: 60 * 60 * 24 * 30,
  });
}
export default createWineryList;
