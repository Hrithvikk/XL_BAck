const mongoose = require("mongoose");
const connection = require("../db/connection");
const regSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
});
const Register = connection.model("registers", regSchema);
module.exports = Register;
