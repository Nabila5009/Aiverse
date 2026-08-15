import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import aiRoutes from "./routes/aiRoutes.js";
import dataAnalysisRoutes from "./routes/dataAnalysisRoutes.js";
// Load environment variables
dotenv.config();

const app = express();

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// ROUTES
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.use(
  "/api/data-analysis",
  dataAnalysisRoutes
);

// ==============================
// HOME ROUTE
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AIVerse Backend Running 🚀",
  });
});

// ==============================
// PROTECTED PROFILE ROUTE
// ==============================

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Welcome to your profile",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==============================
// START SERVER
// ==============================

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Test PostgreSQL connection
    const result = await pool.query("SELECT NOW()");

    console.log(
      "✅ PostgreSQL Connected:",
      result.rows[0].now
    );

    // Start Express
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();