import PocketBase from "pocketbase";

const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL ?? "http://127.0.0.1:8090";

export const pb = new PocketBase(pocketBaseUrl);

// Disable request cancellation so shared queries are predictable across rerenders.
pb.autoCancellation(false);
