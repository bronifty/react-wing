const sqlite3 = require("sqlite3").verbose();
const { randomUUID } = require("crypto");

// Open the SQLite database
let db = new sqlite3.Database("./local.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Generate a UUID and update the 'id' column for each row in the 'medias' table
db.each(
  "SELECT rowid FROM medias",
  (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const uuid = randomUUID();
    db.run(
      `UPDATE medias SET id = ? WHERE rowid = ?`,
      [uuid, row.rowid],
      function (err) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`Row(s) updated: ${this.changes}`);
      }
    );
  },
  (err, count) => {
    // This callback is executed once all rows have been processed
    if (err) {
      console.error("Error completing the query: ", err);
    } else {
      console.log(`Processed ${count} rows.`);
    }

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Closed the SQLite database.");
    });
  }
);
