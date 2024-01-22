const express = require("express");
const fsPromises = require("fs").promises;
const path = require("path");
const uuid = require("./helpers/uuid");

const app = express();
const PORT = 3000;

// using middle ware
app.use(express.static("public"));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// route used to read the database object and serve as JSON object
app.get("/api/notes", async (req, res) => {
  const fileData = await fsPromises.readFile("./db/db.json", "utf-8");
  const jsonData = JSON.parse(fileData);
  res.json(jsonData);
});

// request body is read and new response is served with id
app.post("/api/notes", async (req, res) => {
  const reqBody = req.body;
  // uuid created which is needed to delete the note
  reqBody.id = uuid();
  // console.log(reqBody);
  const fileData = await fsPromises.readFile("./db/db.json", "utf-8");
  const jsonData = JSON.parse(fileData);
  // console.log(jsonData);
  jsonData.push(reqBody);
  console.log(jsonData);
  await fsPromises.writeFile("./db/db.json", JSON.stringify(jsonData));
  res.json(jsonData);
});

// starting the server at PORT 3000;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
