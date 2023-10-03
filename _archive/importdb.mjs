import db from "./db.mjs";

const rs = await db.execute("SELECT * FROM medias");
console.log(rs);
