const express = require('express');

const api = express();
const PORT = 3000;

// starting the server at PORT 3000;
api.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));