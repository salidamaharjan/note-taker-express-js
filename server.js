const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// using middle ware
app.use(express.static('public'));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public', 'notes.html')));


// starting the server at PORT 3000;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));