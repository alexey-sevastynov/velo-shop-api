const multer = require("multer");
const fs = require("fs");

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
require("dotenv").config();

const cors = require("cors");

const { register, login, getMe } = require("./controllers/UserController");

const handleValidationErrors = require("./utils/handleValidationErrors");

const {
  registerValidation,
  loginValidation,
  postCreateValidation,
} = require("./validations");
const User = require("./models/User");
const checkAuth = require("./utils/checkAuth.js");

const {
  create,
  getBicycles,
  getOneBicycle,
  removeOneBicycle,
  updateOneBicycle,
} = require("./controllers/PostController");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json());

const PORT = 4444; // https://velo-shop-api.vercel.app

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB OK!"))
  .catch((err) => console.log("DB error:", err));

app.get("/", (req, res) => {
  res.send(`Hello world!`);
});

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.post("/auth/login", loginValidation, handleValidationErrors, login);
app.get("/auth/me", checkAuth, getMe);

app.post("/uploads", upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});

app.get("/bicycles", getBicycles);
app.get("/bicycles/:id", getOneBicycle);
app.post(
  "/bicycles",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
);
app.delete("/bicycles/:id", removeOneBicycle);
app.patch(
  "/bicycles/:id",
  postCreateValidation,
  handleValidationErrors,
  updateOneBicycle
);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Error! ${err}`);
  }
  console.log(`Server OK! http://localhost:${PORT}/`);
});
