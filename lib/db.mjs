import { createClient } from "@libsql/client";

const config = {
  url: "file:local.db",
};
const db = createClient(config);
export default db;

// const rs = await db.execute("SELECT * FROM medias");
// console.log(rs);
