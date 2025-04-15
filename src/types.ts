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
  APIFY_HOOK_URL_KEY: string;
  APIFY_KEY: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  KV_NAMESPACE_ID: string;
  CLOUDFLARE_KEY: string;
  GOOGLE_MAPS_KEY: string;
  APIFY_DATASET_ID: string;
  winery_data: KVNamespace;
};
export type WineryOld = {
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

export interface Winery {
  city: string;
  location: { lat: number; lng: number } | null;
  openingHours:
    | [
        { day: "Monday"; hours: string },
        { day: "Tuesday"; hours: string },
        { day: "Wednesday"; hours: string },
        { day: "Thursday"; hours: string },
        { day: "Friday"; hours: string },
        { day: "Saturday"; hours: string },
        { day: "Sunday"; hours: string },
      ]
    | []
    | null;
  phoneUnformatted: string;
  postalCode: string;
  placeId: string;
  reviews: {
    reviewerId: string;
    reviewerUrl: string;
    name: string;
    reviewerNumberOfReviews: number;
    isLocalGuide: boolean;
    reviewerPhotoUrl: string;
    text: string | null;
    textTranslated: unknown | null;
    publishAt: string;
    publishedAtDate: string;
    likesCount: number;
    reviewId: string;
    reviewUrl: string;
    reviewOrigin: string;
    stars: 1 | 2 | 3 | 4 | 5;
    rating: null;
    responseFromOwnerDate: null;
    responseFromOwnerText: null;
    reviewImageUrls: [];
    reviewContext: {};
    reviewDetailedRating: {};
    visitedIn: null | unknown;
    originalLanguage: string;
    translatedLanguage: null | unknown;
  }[];
  street: string;
  title: string;
  website: string;
}

export interface WineryWithID extends Winery {
  id: string;
}
