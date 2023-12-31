const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  iD: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLocked: {
    type: Boolean,
    default: false,
}
});

const Login = mongoose.model("login", LoginSchema);
module.exports = Login;
