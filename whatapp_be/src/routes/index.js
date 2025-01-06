import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import conversationRoutes from "./conversation.route.js";
import messageRoutes from "./message.route.js";
import callHistoryRoutes from "./callHistory.route.js"; // Yeni route'yi buraya ekleyin

const router = express.Router();

// Diğer route'ları ekleyin
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/conversation", conversationRoutes);
router.use("/message", messageRoutes);
router.use("/callHistory", callHistoryRoutes); // Yeni route'u buraya ekleyin

export default router;
