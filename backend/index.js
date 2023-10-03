const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const cors = require("cors");
const { randomUUID } = require("crypto");
const {
  nodeFsWriteAndReturn,
  nodeFsReadAndReturn,
  execSQLiteQuery,
  execSQLiteQueryRead,
} = require("./utils.cjs");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
// app.post("/order", async (req, res) => {
//   const { productId, customerId } = req.body;
//   const order = { id: "12345", productId, customerId };
//   try {
//     // (async () => {
//     //   const dbModule = await import("./db.mjs");
//     //   const db = dbModule.default;
//     //   const rs = await db.execute("SELECT * FROM medias");
//     //   console.log(rs);
//     // })();
//     // console.log(rs);
//     await fs.appendFile(
//       "./data/orders.json",
//       JSON.stringify(order, null, 2) + ",\n"
//     );
//     res.status(201).json(order);
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while saving the order." });
//   } finally {
//   }
// });

app.post("/upload", express.json({ limit: "50mb" }), async (req, res) => {
  try {
    // promise.allsettled here
    let payload = req.body;
    payload.key = randomUUID();
    // bucket.put
    await nodeFsWriteAndReturn(payload);
    // table.write
    const executeDbFunction = await execSQLiteQuery(payload);
    const returnVal = await executeDbFunction();
    console.log(`returnVal ${JSON.stringify(returnVal, null, 2)}`);
    res.status(201).json(returnVal);
  } catch (error) {
    console.log(error);
    res.status(500).send(err);
  } finally {
  }
});

app.post("/download", async (req, res) => {
  try {
    const executeDbFunction = await execSQLiteQueryRead(req.body);
    const returnVal = await executeDbFunction();
    const updatedReturnVal = await Promise.all(
      returnVal.map(async (item) => {
        const base64 = await nodeFsReadAndReturn(item.key);
        return { ...item, file: base64 };
      })
    );
    res.status(200).send(updatedReturnVal);
  } catch (error) {
    console.log(error);
    res.status(500).send(err);
  } finally {
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
