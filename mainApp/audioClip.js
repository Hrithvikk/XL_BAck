const express = require("express");
const router = express.Router();
const multer = require("multer");
const Audio = require("../model/audioClipModel");
const { v4 } = require("uuid");

////File Upload
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});
var upload = multer({ storage: storage });
/////Image Upload
const storage1 = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "images");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

var upload1 = multer({ storage: storage1 });

router.post("/image", upload1.single("file"), async (req, res, next) => {
  try {
    const file = req.file;
    res.send(file);
  } catch (error) {
    next(error);
  }
});

////// POST
router.post("/addAudio?", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;
    const name = req.query.name;
    const description = req.query.description;
    const image = req.query.image;
    const userName = req.query.userName;

    const data = new Audio({
      userName: userName,
      id: v4(),
      name: name,
      image: image,
      description: description,
      songFile: file.path,
    });

    const savedData = await data.save();

    res.send(savedData);
  } catch (error) {
    next(error);
  }
});

///GET
router.get("/getaudioList/:userName", async (req, res, next) => {
  try {
    const userName = req.params.userName;

    const find = await Audio.find({ userName: userName });

    res.send(find);
  } catch (error) {
    next(error);
  }
});
///////Update
router.patch("/updateAudio?", upload.single("file"), async (req, res, next) => {
  try {
    const file = req.file;
    const name = req.query.name;
    const description = req.query.description;
    const userName = req.query.userName;
    const id = req.query.id;
    const condition = { $and: [{ id: id }, { userName: userName }] };
    const update = req.query;
    const option = { new: true };
    var find = await Audio.findOneAndUpdate(condition, update, option);
    if (file) {
      find = await Audio.findOneAndUpdate(
        condition,
        { songFile: file.path },
        option
      );
    }
    res.send(find);
  } catch (error) {
    next(error);
  }
});

/////DEL
router.delete("/deleteAudio/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const condition = { id: id };

    const find = await Audio.findOneAndDelete(condition);
    res.send(find);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
