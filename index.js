const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = 4444;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB OK!"))
  .catch((err) => console.log("DB error:", err));

app.get("/", (req, res) => {
  res.send(`Hello world!`);
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: "Alexey",
      passwordHash: req.body.passwordHash,
    },
    "secret"
  );
  res.json({ success: true, token });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  console.log(`Server OK! http://localhost:${PORT}/`);
});
