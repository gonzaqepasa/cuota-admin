// URL para conectar con la api
export const url =
  process.env.NEXT_PUBLIC_DOMAIN_BACK || "http://localhost:3002";

// Url para conectar con mongoose
export const URL_MONGODB =
  process.env.URL_MONGODB || `mongodb://127.0.0.1:27017/${"cuota-admin"}`;
