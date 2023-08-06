const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
require("dotenv").config();

const { registerValidation } = require("./validations/auth");
const User = require("./models/User");
const checkAuth = require("./utils/checkAuth.js");

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

app.post("/auth/register", registerValidation, async (req, res) => {
  //   console.log(req.body);
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json(errors.array());
  //   }
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, "secret", {
      expiresIn: "30d", // stop 30 day
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to register" });
  }
});

app.post("/auth/login", registerValidation, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({ message: "wrong login or password" });
    }

    const token = jwt.sign({ _id: user._id }, "secretKey", {
      expiresIn: "30d", // stop 30 day
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to login" });
  }
});

app.get("/auth/me", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "uset not found" });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Not access!" });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }

  console.log(`Server OK! http://localhost:${PORT}/`);
});
