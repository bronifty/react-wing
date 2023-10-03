const { Ulid } = require("id128");
const id = Ulid.generate();
console.log(id);

(async () => {
  const dbModule = await import("./db.mjs");
  const db = dbModule.default;
  const rs = await db.execute("SELECT * FROM medias");
  console.log(rs);
})();
