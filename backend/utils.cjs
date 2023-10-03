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

const execSQLiteQueryRead = async (payload) => {
  console.log(`execSQLiteQueryRead payload${JSON.stringify(payload, null, 2)}`);

  return async function executeDb() {
    const dbModule = await import("./db.mjs");
    const db = dbModule.default;
    const args = {
      // key: payload.key,
      fileName: payload.fileName,
      // mimeType: payload.mimeType,
      // caption: payload.caption,
    };
    // await db.execute({
    //   sql: "INSERT INTO medias (key, fileName, mimeType, caption) VALUES($key, $fileName, $mimeType, $caption)",
    //   args,
    // });
    const sqliteQueryResult = await db.execute({
      sql: "SELECT * FROM medias WHERE fileName = $fileName",
      args,
    });
    // Format the output
    const formattedResult = sqliteQueryResult.rows.map((row) => ({
      key: row[0],
      fileName: row[1],
      mimeType: row[2],
      caption: row[3],
    }));

    return formattedResult;
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
const nodeFsReadAndReturn = async (key) => {
  console.log(
    `in nodeFsReadAndReturn(key); key: ${JSON.stringify(key, null, 2)}`
  );

  let keyPath = path.join(__dirname, "../backend/data", `${key}`);
  console.log(
    `in nodeFsReadAndReturn(key); keyPath: ${JSON.stringify(keyPath, null, 2)}`
  );
  try {
    const data = await fs.readFile(keyPath, "utf8");
    // console.log(
    //   `in nodeFsReadAndReturn(key); just executed fs.readFile: ${JSON.stringify(
    //     data,
    //     null,
    //     2
    //   )}`
    // );
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
  execSQLiteQueryRead,
};
