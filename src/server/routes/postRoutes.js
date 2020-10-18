import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import { get, createOne, getOne, updateOne, deleteOne } from "../api/postsApi";

const router = express.Router();

const DIR = "./uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/", get);
router.post("/", upload.single("image"), createOne);
router.get("/:postId", getOne);
router.patch("/:postId", updateOne);
router.delete("/:postId", deleteOne);

export default router;
