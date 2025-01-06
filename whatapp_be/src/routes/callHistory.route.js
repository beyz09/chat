// routes/user.routes.js
import express from "express";
import trimRequest from "trim-request";
import { searchUsers } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Kullanıcı bilgilerini ve çağrı geçmişini almak için GET isteği
router.route("/").get(trimRequest.all, authMiddleware, searchUsers);

export default router;
