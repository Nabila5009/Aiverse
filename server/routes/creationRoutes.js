import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getCreationStats,
  getRecentCreations,
} from "../controllers/creationController.js";

const router = express.Router();

// Dashboard statistics
router.get(
  "/stats",
  authMiddleware,
  getCreationStats
);

// Recent AI creations
router.get(
  "/recent",
  authMiddleware,
  getRecentCreations
);

export default router;