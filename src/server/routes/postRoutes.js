import express from "express";
import { get, createOne, getOne, updateOne, deleteOne } from "../api/postsApi";

const router = express.Router();

router.get("/", get);
router.post("/", createOne);
router.get("/:postId", getOne);
router.patch("/:postId", updateOne);
router.delete("/:postId", deleteOne);

export default router;
