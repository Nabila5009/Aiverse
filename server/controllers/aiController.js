import { GoogleGenAI } from "@google/genai";
import fs from "fs";

import { createCreation } from "./creationController.js";


// =========================================================
// GEMINI AI CONFIGURATION
// =========================================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// =========================================================
// HELPER: GEMINI ERROR HANDLER
// =========================================================

const handleGeminiError = (
  error,
  res,
  featureName = "AI"
) => {
  console.error(`❌ ${featureName} Error:`, error);

  const errorMessage = error?.message || "";
  const lowerMessage = errorMessage.toLowerCase();

  // =======================================================
  // QUOTA / RATE LIMIT
  // =======================================================

  if (
    error?.status === 429 ||
    errorMessage.includes("429") ||
    lowerMessage.includes("quota") ||
    lowerMessage.includes("rate limit") ||
    lowerMessage.includes("resource exhausted")
  ) {
    return res.status(429).json({
      success: false,
      message:
        "Gemini AI quota has been exceeded. Please try again later.",
    });
  }


  // =======================================================
  // API KEY ERROR
  // =======================================================

  if (
    lowerMessage.includes("api key") ||
    lowerMessage.includes("unauthorized") ||
    lowerMessage.includes("authentication")
  ) {
    return res.status(401).json({
      success: false,
      message:
        "Gemini API key is missing or invalid. Please check your server .env file.",
    });
  }


  // =======================================================
  // GENERAL ERROR
  // =======================================================

  return res.status(500).json({
    success: false,
    message:
      errorMessage ||
      `Failed to process ${featureName.toLowerCase()} request.`,
  });
};


// =========================================================
// AI CHAT
// =========================================================

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;


    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }


    console.log("🤖 AI Chat Request Received");


    // -------------------------------------------------------
    // GEMINI REQUEST
    // -------------------------------------------------------

    const interaction =
      await ai.interactions.create({
        model: "gemini-3.6-flash",

        input: message.trim(),

        store: false,
      });


    const reply = interaction.output_text;


    // -------------------------------------------------------
    // EMPTY RESPONSE
    // -------------------------------------------------------

    if (!reply) {
      return res.status(500).json({
        success: false,
        message:
          "Gemini returned an empty response",
      });
    }


    console.log(
      "✅ Gemini Chat response generated"
    );


    // -------------------------------------------------------
    // SAVE CREATION
    // -------------------------------------------------------

    await createCreation({
      userId: req.user.id,

      toolType: "ai-chat",

      title: "AI Chat",

      description:
        message.trim().slice(0, 100),
    });


    // -------------------------------------------------------
    // RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({
      success: true,
      reply,
    });


  } catch (error) {
    return handleGeminiError(
      error,
      res,
      "AI Chat"
    );
  }
};


// =========================================================
// DATA ANALYSIS
// =========================================================

export const analyzeData = async (req, res) => {
  let filePath = null;


  try {

    // -------------------------------------------------------
    // CHECK FILE
    // -------------------------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload a CSV or Excel file",
      });
    }


    filePath = req.file.path;


    console.log(
      "📊 Data Analysis File:",
      req.file.originalname
    );


    // -------------------------------------------------------
    // UPLOAD FILE TO GEMINI
    // -------------------------------------------------------

    const uploadedFile =
      await ai.files.upload({
        file: filePath,

        config: {
          mimeType: req.file.mimetype,
        },
      });


    console.log(
      "✅ File uploaded to Gemini:",
      uploadedFile.uri
    );


    // -------------------------------------------------------
    // ANALYSIS PROMPT
    // -------------------------------------------------------

    const prompt = `
You are an expert business data analyst.

Analyze the uploaded business dataset carefully.

Your job is to understand the actual data and generate useful business insights.

Analyze:

1. Executive Summary
2. Important Business Metrics
3. Sales / Revenue Performance
4. Growth Trends
5. Highest Performing Products or Categories
6. Lowest Performing Products or Categories
7. Important Patterns or Anomalies
8. Key Business Insights
9. Actionable Recommendations

IMPORTANT RULES:

- Use actual numbers from the uploaded dataset.
- Do not invent numbers.
- Do not make unsupported assumptions.
- Clearly mention important trends.
- Identify useful business opportunities.
- Identify potential problems.
- Keep the explanation understandable for a business user.

Return a structured business analysis.
`;


    // -------------------------------------------------------
    // GEMINI ANALYSIS
    // -------------------------------------------------------

    const interaction =
      await ai.interactions.create({
        model: "gemini-3.6-flash",

        input: [
          {
            type: "text",
            text: prompt,
          },

          {
            type: "document",
            uri: uploadedFile.uri,
            mime_type:
              uploadedFile.mimeType,
          },
        ],

        store: false,
      });


    const analysis =
      interaction.output_text;


    // -------------------------------------------------------
    // EMPTY RESPONSE
    // -------------------------------------------------------

    if (!analysis) {
      return res.status(500).json({
        success: false,
        message:
          "Gemini returned an empty analysis",
      });
    }


    console.log(
      "✅ Gemini analysis completed"
    );


    // -------------------------------------------------------
    // SAVE CREATION
    // -------------------------------------------------------

    await createCreation({
      userId: req.user.id,

      toolType: "data-analysis",

      title: req.file.originalname,

      description:
        "Business data analysis",
    });


    // -------------------------------------------------------
    // RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({
      success: true,
      analysis,
    });


  } catch (error) {

    return handleGeminiError(
      error,
      res,
      "Data Analysis"
    );

  } finally {

    // -------------------------------------------------------
    // DELETE TEMPORARY FILE
    // -------------------------------------------------------

    if (
      filePath &&
      fs.existsSync(filePath)
    ) {

      try {

        fs.unlinkSync(filePath);

        console.log(
          "🗑️ Temporary analysis file deleted"
        );

      } catch (deleteError) {

        console.error(
          "⚠️ Could not delete temporary file:",
          deleteError.message
        );

      }
    }
  }
};


// =========================================================
// TRANSLATOR
// =========================================================

export const translateText = async (
  req,
  res
) => {

  try {

    const {
      text,
      sourceLanguage,
      targetLanguage,
    } = req.body;


    // -------------------------------------------------------
    // VALIDATE TEXT
    // -------------------------------------------------------

    if (
      !text ||
      typeof text !== "string" ||
      !text.trim()
    ) {

      return res.status(400).json({
        success: false,
        message: "Text is required",
      });

    }


    // -------------------------------------------------------
    // VALIDATE TARGET LANGUAGE
    // -------------------------------------------------------

    if (
      !targetLanguage ||
      typeof targetLanguage !== "string"
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Target language is required",
      });

    }


    // -------------------------------------------------------
    // SAME LANGUAGE CHECK
    // -------------------------------------------------------

    if (
      sourceLanguage &&
      sourceLanguage !== "Auto Detect" &&
      sourceLanguage === targetLanguage
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Source and target languages must be different.",
      });

    }


    console.log(
      `🌍 Translation Request: ${
        sourceLanguage || "Auto Detect"
      } → ${targetLanguage}`
    );


    // -------------------------------------------------------
    // SOURCE LANGUAGE
    // -------------------------------------------------------

    const source =
      sourceLanguage &&
      sourceLanguage !== "Auto Detect"
        ? sourceLanguage
        : "the detected source language";


    // -------------------------------------------------------
    // TRANSLATION PROMPT
    // -------------------------------------------------------

    const prompt = `
You are a professional translator.

Translate the following text from ${source} to ${targetLanguage}.

IMPORTANT RULES:

1. Return ONLY the translated text.
2. Do NOT add explanations.
3. Do NOT add quotation marks.
4. Do NOT add headings.
5. Do NOT say "Here is the translation".
6. Preserve the original meaning.
7. Preserve the original tone.
8. Preserve line breaks where possible.
9. Do not summarize.
10. Do not change names, numbers, URLs, or special terms unnecessarily.

Text to translate:

${text.trim()}
`;


    // -------------------------------------------------------
    // GEMINI TRANSLATION
    // -------------------------------------------------------

    const interaction =
      await ai.interactions.create({
        model: "gemini-3.6-flash",

        input: prompt,

        store: false,
      });


    const translation =
      interaction.output_text;


    // -------------------------------------------------------
    // EMPTY RESPONSE CHECK
    // -------------------------------------------------------

    if (!translation) {

      return res.status(500).json({
        success: false,
        message:
          "Gemini returned an empty translation.",
      });

    }


    console.log(
      "✅ Translation completed successfully"
    );


    // =======================================================
    // SAVE TRANSLATOR USAGE
    // =======================================================

    await createCreation({

      userId: req.user.id,

      toolType: "translator",

      title: `${sourceLanguage || "Auto Detect"} → ${targetLanguage}`,

      description:
        text.trim().slice(0, 100),

    });


    // -------------------------------------------------------
    // RESPONSE
    // -------------------------------------------------------

    return res.status(200).json({

      success: true,

      translation:
        translation.trim(),

      sourceLanguage:
        sourceLanguage || "Auto Detect",

      targetLanguage,

    });


  } catch (error) {

    return handleGeminiError(
      error,
      res,
      "Translation"
    );

  }
};