const { Ulid } = require("id128");
const fs = require("fs").promises;
const path = require("path");
const nodeFsWriteAndReturn = async (inputFile) => {
  //req.body = {
  //   file: await readFileAsDataURL(file),
  //   fileName: slugify(file.name),
  //   mimeType: encodeURIComponent(file.type),
  // }
  // const id = Ulid.generate();
  // console.log(id);

  (async () => {
    const dbModule = await import("./db.mjs");
    const db = dbModule.default;
    const rs = await db.execute("SELECT * FROM medias");
    console.log(rs);
  })();
  let inputFilePath = path.join(
    __dirname,
    "../backend/data",
    `${inputFile.fileName}.json`
  );
  try {
    await fs.writeFile(inputFilePath, JSON.stringify(inputFile));
    return inputFile.fileName;
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
};
