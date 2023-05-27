const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");
const bcrypt = require("bcrypt");

////Register
router.post("/register/createUser", async (req, res, next) => {
  try {
    const { userName, mobile } = req.body;
    const password = req.body.password;
    const bcryptPass = await bcrypt.hash(password, 10);
    const data = new Register({
      userName,
      mobile,
      password: bcryptPass,
    });
    const savedData = await data.save();
    res.send({ result: 1, data: savedData, msg: "Registration Completed" });
  } catch (error) {
    next(error);
  }
});
////Login
router.post("/login/userlogin", async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const find = await Register.findOne({ userName: userName });
    if (find) {
      const data = await bcrypt.compare(password, find.password);
      if (data === true) {
        res.send({ result: 2, data: find });
      } else {
        res.send({ result: 1, msg: "Password not matched................" });
      }
    } else {
      res.send({ result: 0, msg: " Invalid Id ....." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
