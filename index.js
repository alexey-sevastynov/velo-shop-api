const express = require("express");

const app = express();
const PORT = 4444;

app.get("/", (req, res) => {
  res.send(`Hello world!`);
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  console.log(`Server OK! http://localhost:${PORT}/`);
});
