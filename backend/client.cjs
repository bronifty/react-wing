const { Ulid } = require("id128");
const inputFile = { fileName: "abc", mimeType: "def" };
let sqliteQueryResult;
async function executeDb() {
  const dbModule = await import("./db.mjs");
  const db = dbModule.default;
  // await db.execute({
  //   sql: "INSERT INTO medias (key, fileName, mimeType, caption) VALUES($key, $fileName, $mimeType, $caption)",
  //   args: {
  //     key: `${Ulid.generate()}`,
  //     fileName: inputFile.fileName,
  //     mimeType: inputFile.mimeType,
  //     caption: "yes hello this is dog",
  //   },
  // });
  const sqliteQueryResult = await db.execute("SELECT * FROM medias");
  return sqliteQueryResult;
}
executeDb().then((result) => console.log(result));
