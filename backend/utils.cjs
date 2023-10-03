const fs = require("fs").promises;
const path = require("path");
// req.body = {
//   key: randomUUID(),
//   file: await readFileAsDataURL(file),
//   fileName: slugify(file.name),
//   mimeType: encodeURIComponent(file.type),
// };
// CREATE TABLE medias (key TEXT, fileName TEXT, mimeType TEXT, caption TEXT);
const execSQLiteQuery = async (payload) => {
  return async function executeDb() {
    const dbModule = await import("./db.mjs");
    const db = dbModule.default;
    const args = {
      key: payload.key,
      fileName: payload.fileName,
      mimeType: payload.mimeType,
      caption: payload.caption,
    };
    await db.execute({
      sql: "INSERT INTO medias (key, fileName, mimeType, caption) VALUES($key, $fileName, $mimeType, $caption)",
      args,
    });
    const sqliteQueryResult = await db.execute({
      sql: "SELECT * FROM medias WHERE key = $key",
      args,
    });
    return sqliteQueryResult;
  };
  // executeDb().then((result) => console.log(result));
};

const nodeFsWriteAndReturn = async (payload) => {
  let payloadPath = path.join(__dirname, "../backend/data", payload.key);
  try {
    await fs.writeFile(payloadPath, payload.file);
    return payload.key;
  } catch (error) {
    console.log(error);
  } finally {
  }
};
const nodeFsReadAndReturn = async (inputFile) => {
  let inputFilePath = path.join(
    __dirname,
    "../backend/data",
    `${inputFile}.json`
  );
  try {
    const data = await fs.readFile(inputFilePath, "utf8");
    return data;
  } catch (error) {
    console.log(error);
  } finally {
  }
};
module.exports = {
  nodeFsReadAndReturn,
  nodeFsWriteAndReturn,
  execSQLiteQuery,
};
