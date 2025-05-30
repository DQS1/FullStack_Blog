import {
  check,
  getMe,
  login,
  logout,
  refreshToken,
} from "../app/controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import express from "express";

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.get("/me", requireAuth, getMe);
authRoutes.get("/check", requireAuth, check);
authRoutes.post("/logout", requireAuth, logout);
authRoutes.get("/refresh-token", refreshToken);

export default authRoutes;
