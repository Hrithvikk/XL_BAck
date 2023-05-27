const mongoose = require("mongoose");
const connection = require("../db/connection");
const audSchema = new mongoose.Schema({
  id: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  songFile: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: 0,
  },
  userName: {
    type: String,
    default: "",
  },
});
const Audio = connection.model("audioClips", audSchema);
module.exports = Audio;
