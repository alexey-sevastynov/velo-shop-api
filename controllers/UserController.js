const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");

const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      //password encryption
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
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
};

const login = async (req, res) => {
  try {
    // has email login user ?
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

    const token = jwt.sign({ _id: user._id }, "secret", {
      expiresIn: "30d", // stop 30 day
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to login" });
  }
};

const getMe = async (req, res) => {
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
};

module.exports = { register, login, getMe };
