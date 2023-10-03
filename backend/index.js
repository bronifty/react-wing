const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const cors = require("cors");
// const { randomUUID } = require("crypto");
const ULID = require("ulid");
const {
  nodeFsWriteAndReturn,
  nodeFsReadAndReturn,
  db,
} = require("../lib/utils.cjs");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.post("/order", async (req, res) => {
  const { productId, customerId } = req.body;
  const order = { id: ULID.ulid(), productId, customerId };
  try {
    // (async () => {
    //   const dbModule = await import("./db.mjs");
    //   const db = dbModule.default;
    //   const rs = await db.execute("SELECT * FROM medias");
    //   console.log(rs);
    // })();
    // console.log(rs);
    await fs.appendFile(
      "./data/orders.json",
      JSON.stringify(order, null, 2) + ",\n"
    );
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the order." });
  } finally {
  }
});

app.post("/upload", express.json({ limit: "50mb" }), async (req, res) => {
  try {
    const returnVal = await nodeFsWriteAndReturn(req.body);
    res.status(201).json(returnVal);
  } catch (error) {
    console.log(error);
    res.status(500).send(err);
  } finally {
  }
});

app.post("/download", async (req, res) => {
  const { fileName } = req.body;
  try {
    const file = await nodeFsReadAndReturn(fileName);
    res.status(200).send(file);
  } catch (error) {
    console.log(error);
    res.status(500).send(err);
  } finally {
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
