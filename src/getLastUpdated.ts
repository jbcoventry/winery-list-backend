import { Env, Winery, WineryWithID } from "./types";

async function getLastUpdated(
  request: Request,
  env: Env,
  ct: ExecutionContext,
) {
  const data = await env.winery_data.get("lastUpdated", { type: "json" });
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json;charset=UTF-8" },
  });
}

export default getLastUpdated;
