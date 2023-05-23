async function sendToKV(request, env, ctx, data) {
  const wineries = data.map((item) => {
    return {
      id: item.placeId,
      title: item.title,
      scrapedAt: Date.parse(item.scrapedAt),
      reviews: item.reviews.map((review) => review.reviewId),
    };
  });
  const reviewDetails = data
    .map((item) => {
      return item.reviews.map((review) => {
        return {
          id: review.reviewId,
          rating: review.stars,
          publishedAtDate: Date.parse(review.publishedAtDate),
        };
      });
    })
    .flat();
  const reviewComments = data
    .map((item) => {
      return item.reviews.map((review) => {
        return {
          id: review.reviewId,
          text: review.text,
        };
      });
    })
    .flat();
  await env.kv.put("wineries", JSON.stringify(wineries));
  await env.kv.put("reviewDetails", JSON.stringify(reviewDetails));
  await env.kv.put("reviewComments", JSON.stringify(reviewComments));
  return new Response("sendToKV successful", { status: 200 });
}
export default sendToKV;
