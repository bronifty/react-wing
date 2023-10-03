app.post("/uploads", express.json(), (req, res) => {
  const { file: base64String } = req.body;
  if (!base64String) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  // Remove the data URL prefix and convert the base64 string to a Buffer
  const buffer = Buffer.from(
    base64String.replace(/^data:.+;base64,/, ""),
    "base64"
  );
  // Generate a unique filename
  // const filename = uuidv4();

  const filename = "image.txt";
  // Write the file to the disk storage
  fs.writeFile(`./data/${filename}`, buffer, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while saving the file." });
    }
    res.status(201).json({ message: "File uploaded successfully.", filename });
  });
});
