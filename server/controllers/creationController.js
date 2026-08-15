import pool from "../config/db.js";

// ==========================================
// GET DASHBOARD STATS
// ==========================================

export const getCreationStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        COUNT(*)::int AS total_creations,

        COUNT(*) FILTER (
          WHERE tool_type = 'content-writer'
        )::int AS content_created,

        COUNT(*) FILTER (
          WHERE tool_type = 'image-generator'
        )::int AS images_generated,

        COUNT(*) FILTER (
          WHERE tool_type = 'data-analysis'
        )::int AS data_analyses,

        COUNT(*) FILTER (
          WHERE tool_type = 'ai-chat'
        )::int AS ai_chats,

        COUNT(*) FILTER (
          WHERE tool_type = 'code-generator'
        )::int AS code_generated,

        COUNT(*) FILTER (
          WHERE tool_type = 'website-builder'
        )::int AS websites_built,

        COUNT(*) FILTER (
          WHERE tool_type = 'templates'
        )::int AS cards_created

      FROM creations
      WHERE user_id = $1
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      stats: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Creation Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
    });
  }
};

// ==========================================
// GET RECENT CREATIONS
// ==========================================

export const getRecentCreations = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        id,
        tool_type,
        title,
        description,
        created_at
      FROM creations
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 10
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      creations: result.rows,
    });
  } catch (error) {
    console.error("❌ Recent Creations Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load recent creations",
    });
  }
};
// ==========================================
// CREATE CREATION RECORD
// ==========================================

export const createCreation = async ({
  userId,
  toolType,
  title,
  description = "",
}) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO creations
      (
        user_id,
        tool_type,
        title,
        description
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        userId,
        toolType,
        title,
        description,
      ]
    );

    console.log(
      `✅ Creation saved: ${toolType}`
    );

    return result.rows[0];
  } catch (error) {
    console.error(
      "❌ Failed to save creation:",
      error
    );

    // Creation save fail hone par
    // AI tool ko fail nahi karna hai
    return null;
  }
};