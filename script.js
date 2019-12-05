const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log("/ endpoint hit");
  res.send('Hi this is new');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

