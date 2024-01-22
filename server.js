const express = require("express");
const fsPromises = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3000;

// using middle ware
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// route used to read the database object and serve as JSON object
app.get('/api/notes', async (req, res) => {
  const fileData = await fsPromises.readFile('./db/db.json', 'utf-8');
  const jsonData = JSON.parse(fileData);
  res.json(jsonData);
})

// starting the server at PORT 3000;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
