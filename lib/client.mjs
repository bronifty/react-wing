// example usage of libsql in an esm file with access to node process
// import db from "./db.mjs";

// const rs = await db.execute("SELECT * FROM medias");
// console.log(rs);
const { Ulid } = await import("https://esm.sh/id128@1.6.6");

let keyObj = Ulid.generate();
let key = keyObj.toRaw();
