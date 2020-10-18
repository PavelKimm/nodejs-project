import express from "express";
import multer from "multer";

import { get, createOne, getOne, updateOne, deleteOne } from "../api/postsApi";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/", get);
router.post("/", upload.single("image"), createOne);
router.get("/:postId", getOne);
router.patch("/:postId", updateOne);
router.delete("/:postId", deleteOne);

export default router;
