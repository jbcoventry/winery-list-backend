async function sendToKV(request, env, ctx, data) {
  const wineries = data.map((winery) => {
    return {
      title: winery.title,
      reviews: winery.reviews.map((review) => {
        return {
          rating: review.stars,
          timestamp: Math.round(Date.parse(review.publishedAtDate) / 1000),
        };
      }),
    };
  });
  const reviewComments = data
    .map((winery, wineryIndex) => {
      return winery.reviews.map((review, reviewIndex) => {
        return {
          id: `${wineryIndex}-${reviewIndex}`,
          text: review.text,
        };
      });
    })
    .flat()
    .filter((review) => review.text !== null)
    .reduce((acc, review) => {
      const { id, text } = review;
      return { ...acc, [id]: text };
    }, {});
  await env.kv.put("list", JSON.stringify(wineries));
  await env.kv.put("comments", JSON.stringify(reviewComments));
  await env.kv.put("lastUpdated", JSON.stringify(new Date().toJSON()));
  return new Response("sendToKV successful", { status: 200 });
}
export default sendToKV;
