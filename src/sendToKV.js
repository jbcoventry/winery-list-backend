async function sendToKV(request, env, ctx, data) {
  console.time("list");
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
  console.timeEnd("list");
  // console.time("reviewsText");

  // const reviewsText = data
  //   .map(({ reviews }, wineryIndex) => {
  //     return reviews.map(({ text }, reviewIndex) => {
  //       return {
  //         id: `${wineryIndex}-${reviewIndex}`,
  //         text,
  //       };
  //     });
  //   })
  //   .flat()
  //   .filter(({ text }) => text !== null)
  //   .reduce((acc, { id, text }) => {
  //     return { ...acc, [id]: text };
  //   }, {});
  // console.timeEnd("reviewsText");

  await env.kv.put("list", JSON.stringify(list), {
    expirationTtl: 60 * 60 * 24 * 30,
  });
  // await env.kv.put("reviewsText", JSON.stringify(reviewsText), {
  //   expirationTtl: 60 * 60 * 24 * 30,
  // });
  await env.kv.put("lastUpdated", JSON.stringify(new Date().toJSON()), {
    expirationTtl: 60 * 60 * 24 * 30,
  });

  // data.forEach(async ({ title, reviews }, wineryIndex) => {
  //   const formattedReviews = reviews
  //     .map(({ text }, reviewIndex) => {
  //       return {
  //         id: reviewIndex,
  //         text,
  //       };
  //     })
  //     .filter(({ text }) => text !== null)
  //     .reduce((acc, { id, text }) => {});

  //   return new Response("sendToKV successful", { status: 200 });
  // });
}
export default sendToKV;
