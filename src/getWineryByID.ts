import { Env, Winery, WineryWithID } from "./types";

async function getWineryByID(request: Request, env: Env, ct: ExecutionContext) {
  const wineryId = request.url.split("/").pop();
  console.log(wineryId);
  const data = await env.winery_data.get(`${wineryId}`, { type: "json" });
  if (data === null) {
    return new Response("something went wrong", {
      status: 500,
      headers: { "content-type": "application/json;charset=UTF-8" },
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json;charset=UTF-8" },
  });
}

export default getWineryByID;
