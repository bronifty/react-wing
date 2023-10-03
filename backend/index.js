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
  // const { fileName } = req.body;
  // console.log(`req.body ${JSON.stringify(req.body, null, 2)}`);

  try {
    // query db for fileName to get key, which is passed to nodeFsReadAndReturn(key)
    const executeDbFunction = await execSQLiteQueryRead(req.body);
    const returnVal = await executeDbFunction();
    // console.log(
    //   `back in app.post(/download); just executed 'execSQLiteQueryRead(req.body); returnVal: ${JSON.stringify(
    //     returnVal,
    //     null,
    //     2
    //   )}`
    // );
    // console.log(`returnVal[0]: ${JSON.stringify(returnVal[0], null, 2)}`);
    // console.log(
    //   `returnVal[0].key: ${JSON.stringify(returnVal[0].key, null, 2)}`
    // );

    // res.status(201).json(returnVal);
    let file = await nodeFsReadAndReturn(returnVal[0].key);
    // console.log(
    //   `temp val from nodeFsReadAndReturn ${JSON.stringify(temp, null, 2)}`
    // );

    // returnVal.file = temp;
    let payload = { ...returnVal, file };
    console.log(`returnVal ${payload}`);
    for (let key in payload) {
      console.log("for let key in payload");

      console.log(key, payload[key]);
    }

    res.status(200).send(payload);
  } catch (error) {
    console.log(error);
    res.status(500).send(err);
  } finally {
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
