// example usage of libsql in an esm file with access to node process
import db from "./db.mjs";

const rs = await db.execute("SELECT * FROM medias");
console.log(rs);
