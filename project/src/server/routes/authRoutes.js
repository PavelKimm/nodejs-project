import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  register,
  login,
  deleteAccount,
  validateJwt,
  getCurrentUserData,
} from "../api/authApi";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/accounts/delete", authMiddleware, deleteAccount);
router.post("/validate-jwt", validateJwt);
router.get("/current-user-data", authMiddleware, getCurrentUserData);

export default router;
