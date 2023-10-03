const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const cors = require("cors");
const {
  handleDownload,
  nodeFsWriteAndReturn,
  retrieveBase64,
} = require("../lib/utils.cjs");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));

app.post("/upload", express.json({ limit: "50mb" }), async (req, res) => {
  // body: JSON.stringify({
  //   file: base64,
  //   fileName: slugify(file.name),
  //   mimeType: file.type,
  // }),

  const returnVal = await nodeFsWriteAndReturn(req.body);
  // console.log(
  //   `in app.post just called nodeFsWriteAndReturn; returnVal: ${JSON.stringify(
  //     returnVal,
  //     null,
  //     2
  //   )}`
  // );

  res.status(201).json(returnVal);
});

app.post("/download", async (req, res) => {
  const { fileName } = req.body;
  try {
    const file = await handleDownload(fileName);
    // const {
    //   file,
    //   fileName: fileNameDownload,
    //   mimeType,
    // } = await handleDownload(fileName);
    res.status(200).send(file);
  } catch (error) {
    console.log(error);
    res.status(500).send(err);
  } finally {
  }
});
app.post("/download-base64", async (req, res) => {
  const { fileName } = req.body;
  try {
    // const {
    //   file,
    //   fileName: fileNameDownload,
    //   mimeType,
    // } = await handleDownload(fileName);
    const jsonData = await retrieveBase64(fileName);
    res.status(200).send(jsonData);
  } catch (error) {
    console.log(error);
    res.status(500).send(err);
  } finally {
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));

// app.post("/orders", (req, res) => {
//   const { productId, customerId } = req.body;
//   const order = { id: uuidv4(), productId, customerId };

//   fs.appendFile(
//     "./data/orders.json",
//     JSON.stringify(order, null, 2) + ",\n",
//     (err) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ error: "An error occurred while saving the order." });
//       }
//       res.status(201).json(order);
//     }
//   );
// });
