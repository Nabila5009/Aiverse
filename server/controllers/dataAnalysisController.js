import * as XLSX from "xlsx";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV or Excel file.",
      });
    }

    // ==========================================
    // 1. READ FILE
    // ==========================================

    const workbook = XLSX.read(req.file.buffer, {
      type: "buffer",
    });

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(worksheet, {
      defval: null,
    });

    if (!rows.length) {
      return res.status(400).json({
        success: false,
        message: "The uploaded file contains no data.",
      });
    }

    // ==========================================
    // 2. DATASET INFORMATION
    // ==========================================

    const columns = Object.keys(rows[0]);

    const columnInfo = columns.map((column) => {
      const values = rows
        .map((row) => row[column])
        .filter(
          (value) =>
            value !== null &&
            value !== undefined &&
            value !== ""
        );

      const numericValues = values
        .map((value) => Number(value))
        .filter((value) => !Number.isNaN(value));

      const isNumeric =
        values.length > 0 &&
        numericValues.length / values.length > 0.7;

      return {
        name: column,
        type: isNumeric ? "numeric" : "categorical",
        sample: values.slice(0, 5),
        uniqueValues: [...new Set(values)].slice(0, 10),
      };
    });

    // ==========================================
    // 3. NUMERIC STATISTICS
    // ==========================================

    const statistics = {};

    for (const column of columns) {
      const values = rows
        .map((row) => Number(row[column]))
        .filter((value) => !Number.isNaN(value));

      if (values.length > 0) {
        const total = values.reduce(
          (sum, value) => sum + value,
          0
        );

        const average = total / values.length;

        const min = Math.min(...values);

        const max = Math.max(...values);

        statistics[column] = {
          count: values.length,
          total: Number(total.toFixed(2)),
          average: Number(average.toFixed(2)),
          min,
          max,
        };
      }
    }

    // ==========================================
    // 4. SAMPLE DATA
    // ==========================================

    const sampleRows = rows.slice(0, 100);

    // ==========================================
    // 5. GEMINI PROMPT
    // ==========================================

    const prompt = `
You are a professional business data analyst.

Analyze the uploaded business dataset.

Your job is NOT to write a long text report.

Your job is to produce structured dashboard information that a React application can render.

Dataset information:

Rows:
${rows.length}

Columns:
${JSON.stringify(columnInfo, null, 2)}

Numeric statistics:
${JSON.stringify(statistics, null, 2)}

Sample data:
${JSON.stringify(sampleRows, null, 2)}

Return ONLY valid JSON matching the requested schema.

Create:

1. dashboard title
2. short summary
3. 4 important KPI cards
4. important business insights
5. recommendations
6. 2-4 useful charts

Chart types allowed:

- bar
- line
- pie

For each chart provide:

title
type
xKey
yKey
data

IMPORTANT:

Use column names that actually exist in the dataset.

Do not invent column names.

KPI values should come from the provided statistics/data.

Make the result useful for a business dashboard.

Do not use markdown.
`;

    // ==========================================
    // 6. STRUCTURED GEMINI RESPONSE
    // ==========================================

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",

      input: prompt,

      store: false,

      response_format: {
        type: "text",
        mime_type: "application/json",

        schema: {
          type: "object",

          properties: {
            title: {
              type: "string",
            },

            summary: {
              type: "string",
            },

            kpis: {
              type: "array",
              items: {
                type: "object",

                properties: {
                  label: {
                    type: "string",
                  },

                  value: {
                    type: "string",
                  },

                  description: {
                    type: "string",
                  },
                },

                required: [
                  "label",
                  "value",
                  "description",
                ],
              },
            },

            insights: {
              type: "array",

              items: {
                type: "string",
              },
            },

            recommendations: {
              type: "array",

              items: {
                type: "string",
              },
            },

            charts: {
              type: "array",

              items: {
                type: "object",

                properties: {
                  title: {
                    type: "string",
                  },

                  type: {
                    type: "string",
                  },

                  xKey: {
                    type: "string",
                  },

                  yKey: {
                    type: "string",
                  },

                  data: {
                    type: "array",

                    items: {
                      type: "object",

                      additionalProperties: true,
                    },
                  },
                },

                required: [
                  "title",
                  "type",
                  "xKey",
                  "yKey",
                  "data",
                ],
              },
            },
          },

          required: [
            "title",
            "summary",
            "kpis",
            "insights",
            "recommendations",
            "charts",
          ],
        },
      },
    });

    // ==========================================
    // 7. PARSE GEMINI JSON
    // ==========================================

    let analysis;

    try {
      analysis = JSON.parse(
        interaction.output_text
      );
    } catch (parseError) {
      console.error(
        "Gemini JSON Parse Error:",
        parseError
      );

      console.error(
        "Gemini Output:",
        interaction.output_text
      );

      return res.status(500).json({
        success: false,
        message: "AI returned invalid dashboard data.",
      });
    }

    // ==========================================
    // 8. SEND DASHBOARD DATA
    // ==========================================

    return res.status(200).json({
      success: true,

      fileName: req.file.originalname,

      rowCount: rows.length,

      columns,

      analysis,
    });

  } catch (error) {
    console.error(
      "❌ Data Analysis Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to analyze your data.",
    });
  }
};