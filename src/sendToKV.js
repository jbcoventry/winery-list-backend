async function sendToKV(request, env, ctx, data) {
  const list = data.map(
    (
      {
        title,
        street,
        city,
        postalCode,
        website,
        phoneUnformatted: phone,
        location,
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
        location,
        openingHours,
        reviews: reviews.map(({ stars: rating, publishedAtDate }) => {
          return {
            rating,
            timestamp: Math.round(Date.parse(publishedAtDate) / 1000),
          };
        }),
      };
    }
  );
  const reviewsText = data
    .map(({ reviews }, wineryIndex) => {
      return reviews.map(({ text }, reviewIndex) => {
        return {
          id: `${wineryIndex}-${reviewIndex}`,
          text,
        };
      });
    })
    .flat()
    .filter(({ text }) => text !== null)
    .reduce((acc, { id, text }) => {
      return { ...acc, [id]: text };
    }, {});
  await env.kv.put("list", JSON.stringify(list));
  await env.kv.put("reviewsText", JSON.stringify(reviewsText));
  await env.kv.put("lastUpdated", JSON.stringify(new Date().toJSON()));
  return new Response("sendToKV successful", { status: 200 });
}
export default sendToKV;
