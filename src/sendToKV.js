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
  }
  const titles = data.map((item) => item.title);
  await env.kv.put("titles", JSON.stringify(titles));
  return new Response("sendToKV successful", { status: 200 });
}
export default sendToKV;
