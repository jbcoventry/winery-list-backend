async function sendToKV(request, env, ctx, data) {
  for (const item of data) {
    const filteredReviews = item.reviews.map((review) => {
      return {
        text: review.text,
        stars: review.stars,
        publishedAtDate: review.publishedAtDate,
      };
    });
    const filteredItem = {
      title: item.title,
      totalScore: item.totalScore,
      reviewsCount: item.reviewsCount,
      reviews: filteredReviews,
    };
    await env.kv.put(filteredItem.title, JSON.stringify(filteredItem));
    console.log(JSON.stringify(filteredItem));
  }
  return new Response("Put to KV");
}
export default sendToKV;
