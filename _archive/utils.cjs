const fs = require("fs").promises;
const path = require("path");

const prepareBase64File = (file) => {
  let jsonData;
  try {
    jsonData = JSON.parse(file);
  } catch (err) {
    console.error("An error occurred while parsing the JSON data:", err);
    return;
  }
  if (!jsonData.file || !jsonData.fileName || !jsonData.mimeType) {
    console.error("Invalid data format");
    return;
  }
  const fileData = jsonData.file.replace(/^data:.+;base64,/, "");
  return fileData;
};

const transformJsonFileToBinary = (file) => {
  let jsonData;
  try {
    jsonData = JSON.parse(file);
  } catch (err) {
    console.error("An error occurred while parsing the JSON data:", err);
    return;
  }
  if (!jsonData.file || !jsonData.fileName || !jsonData.mimeType) {
    console.error("Invalid data format");
    return;
  }
  const fileData = Buffer.from(
    jsonData.file.replace(/^data:.+;base64,/, ""),
    "base64"
  );
  return {
    file: fileData,
    fileName: jsonData.fileName,
    mimeType: jsonData.mimeType,
  };
};

const parseInputFile = (inputFile) => {
  const parsedInputFile = JSON.parse(inputFile);
  return parsedInputFile;
};
const nodeFsWriteAndReturn = async (inputFile) => {
  let inputFilePath = path.join(
    __dirname,
    "../backend/data",
    `${inputFile.fileName}.json`
  );
  try {
    // data = bucket.get('key');
    await fs.writeFile(inputFilePath, JSON.stringify(inputFile));
    return inputFile.fileName;
  } catch (error) {
    console.log(error);
  } finally {
  }
};
const nodeFsReadAndReturn = async (inputFile) => {
  let inputFilePath = path.join(__dirname, "../backend/data", inputFile);
  let outputFilePath;
  let outputFile;
  try {
    // data = bucket.get('key');
    const data = await fs.readFile(inputFilePath, "utf8");
    return data;
    // const { file, fileName, mimeType } = transformJsonFileToBinary(data);
    // return { file, fileName, mimeType };
    // console.log(`outputFile ${outputFile}`);
  } catch (error) {
    console.log(error);
  } finally {
  }
};
// implement this as strategy pattern
const handleDownload = async (downloadKey, strategy = "fs") => {
  let downloadKeyJson = downloadKey + ".json";
  if (strategy !== "bucket") {
    const data = await nodeFsReadAndReturn(downloadKeyJson);
    return data;
    // const { file, fileName, mimeType } = await nodeFsReadAndReturn(
    //   downloadKeyJson
    // );
    // return { file, fileName, mimeType };
  }
  // const { file, fileName, mimeType } = await bucket.get(downloadKeyJson);
  // return { file, fileName, mimeType };
};

const returnHelloWorld = () => "hello world";

const retrieveBase64 = async (fileName) => {
  let inputFilePath = path.join(
    __dirname,
    "../backend/data",
    `${fileName}.json`
  );
  try {
    // data = bucket.get('key');
    const data = await fs.readFile(inputFilePath, "utf8");
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  transformJsonFileToBinary,
  nodeFsReadAndReturn,
  nodeFsWriteAndReturn,
  handleDownload,
  parseInputFile,
  returnHelloWorld,
  prepareBase64File,
  retrieveBase64,
};

// let downloadKey = "greco-futurism-2.jpeg";
// const binaryFileName = handleDownload(downloadKey);
// console.log(`binaryFileName ${binaryFileName}`);
