import express from "express";
import multer from "multer";

import {
  chatWithAI,
  analyzeData,
  translateText,
} from "../controllers/aiController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// MULTER CONFIGURATION
// ==========================================

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// ==========================================
// AI CHAT
// ==========================================

router.post(
  "/chat",
  authMiddleware,
  chatWithAI
);
// ==========================================
// TRANSLATOR
// ==========================================

router.post(
  "/translate",
  authMiddleware,
  translateText
);

// ==========================================
// DATA ANALYSIS
// ==========================================

router.post(
  "/data-analysis",
  authMiddleware,
  upload.single("file"),
  analyzeData
);

export default router;