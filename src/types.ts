export type Env = {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;
  APIFY_HOOK_URL_KEY: String;
  kv: KVNamespace;
  APIFY_KEY: String;
  CLOUDFLARE_ACCOUNT_ID: String;
  KV_NAMESPACE_ID: String;
  CLOUDFLARE_KEY: String;
};
export type Winery = {
  title: string;
  street: string;
  city: string;
  postalCode: string;
  website: string;
  phoneUnformatted: string;
  openingHours: string;
  lastUpdated: string;
  reviews: { stars: number; publishedAtDate: string }[];
};
