import express from "express";
import multer from "multer";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  analyzeData,
} from "../controllers/dataAnalysisController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post(
  "/analyze",
  authMiddleware,
  upload.single("file"),
  analyzeData
);

export default router;