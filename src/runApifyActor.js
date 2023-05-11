async function runApifyActor() {
  const response = await fetch(
    "https://api.apify.com/v2/actor-tasks/demonstrative_eel~get-all-winery-reviews/runs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${env.APIFY_KEY}`,
      },
    }
  );
  const result = await response.json();
}
export default runApifyActor;
