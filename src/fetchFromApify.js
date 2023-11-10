async function fetchFromApify(request, env) {
  const url = new URL(
    "https://api.apify.com/v2/actor-tasks/demonstrative_eel~get-all-winery-reviews/runs/last/dataset/items"
  );
  url.searchParams.append("format", "json");
  url.searchParams.append("clean", "1");
  url.searchParams.append("status", "SUCCEEDED");
  url.searchParams.append(
    "fields",
    "title,street,city,postalCode,website,phoneUnformatted,location,openingHours,reviews"
  );
  
  // url.searchParams.append("limit", "10");
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
export default fetchFromApify;

// https://api.apify.com/v2/actor-tasks/demonstrative_eel~get-all-winery-reviews/runs/last/dataset/items?token=apify_api_wxMxfCUaKLeiEFjRWTX3zIfmKIVGhe0cfCtY&format=json&clean=1&status=SUCCEEDED&fields=title,street,city,postalCode,website,phoneUnformatted,location,openingHours,reviews
