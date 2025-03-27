import { Env, Winery } from "./types";
async function createIndividualWineryAPIResponses(
  request: Request,
  env: Env,
  ct: ExecutionContext,
  ApifyResponse: Winery[],
  wineryIds: string[],
) {
  const body = ApifyResponse.map((winery, index) => {
    return {
      expiration_ttl: 60 * 60 * 24 * 30,
      key: `${wineryIds[index]}`,
      value: JSON.stringify(winery),
    };
  });

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${env.CLOUDFLARE_KEY}`,
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${env.KV_NAMESPACE_ID}/bulk`,
    requestOptions,
  );
  const result = await response.json();
  return result;
}
export default createIndividualWineryAPIResponses;
