const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());
const mongoose = require('./config/db');

//routers
const router = require('./routes/route.js')
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
