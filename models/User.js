const mongoose = require("mongose");

const UserScheme = new mongoose.Shema(
  {
    fulllName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserScheme);
