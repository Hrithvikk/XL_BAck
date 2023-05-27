const mongoose = require("mongoose");
const connection = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/xceldb",
  {
    useNewUrlParser: true,
    useUnifiedtopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to mongodb");
    }
  }
);
module.exports = connection;
