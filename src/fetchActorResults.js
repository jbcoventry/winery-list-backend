async function fetchActorResults(request, env, ctx) {
  const url = new URL(
    "https://api.apify.com/v2/actor-tasks/demonstrative_eel~get-all-winery-reviews/runs/last/dataset/items"
  );
  url.searchParams.append("format", "json");
  url.searchParams.append("clean", "1");
  url.searchParams.append("status", "SUCCEEDED");
  url.searchParams.append(
    "fields",
    "placeId,title,scrapedAt,street,city,postalCode,website,totalScore,reviewsCount,reviews"
  );
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      authorization: `bearer ${env.APIFY_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`unexpected response ${response.status}`);
  }
  return await response.json();
}
export default fetchActorResults;
