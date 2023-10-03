import { createClient } from "@libsql/client";
const config = {
  url: "file:local.db",
};
const db = createClient(config);
export default db;
