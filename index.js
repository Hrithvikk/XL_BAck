const express = require("express");
require("./db/connection");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

const Audio = require("./mainApp/audioClip");
const Register = require("./mainApp/register");
app.use("/api", Audio, Register);

app.listen(8443, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("SERVER STARTED ON PORT NO '8443'......................");
  }
});
