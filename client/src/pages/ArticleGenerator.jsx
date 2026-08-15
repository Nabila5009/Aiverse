import { useState } from "react";
import { Copy, Check, Sparkles, Loader2 } from "lucide-react";
import api from "../services/api";

function ArticleGenerator() {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("Blog");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Short");

  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ==========================================
  // GENERATE CONTENT
  // ==========================================

  const generateContent = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    setGeneratedContent("");
    setCopied(false);

    const prompt = `
You are a professional content writer.

Create a high-quality ${contentType} on the following topic:

Topic:
${topic}

Content Type:
${contentType}

Tone:
${tone}

Length:
${length}

Requirements:
- Write original and useful content.
- Use clear headings where appropriate.
- Make the content easy to read.
- Do not mention that you are an AI.
- Do not add unnecessary explanations before or after the content.
- Return only the final ${contentType}.
`;

    try {
      const response = await api.post("/ai/chat", {
        message: prompt,
      });

      setGeneratedContent(response.data.reply);
    } catch (error) {
      console.error("Content Generation Error:", error);

      setGeneratedContent(
        error.response?.data?.message ||
          "Failed to generate content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // COPY CONTENT
  // ==========================================

  const copyContent = async () => {
    if (!generatedContent) return;

    try {
      await navigator.clipboard.writeText(generatedContent);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy Error:", error);
    }
  };

  return (
    <div className="space-y-8">

      {/* ======================================
          HEADER
      ====================================== */}

      <div>
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Content Writer
            </h1>

            <p className="text-gray-500 mt-1">
              Create high-quality content with AI in seconds.
            </p>
          </div>

        </div>
      </div>


      {/* ======================================
          CONTENT CONFIGURATION
      ====================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        {/* Topic */}

        <div>
          <label className="font-semibold block mb-3 text-gray-800">
            Topic
          </label>

          <input
            type="text"
            placeholder="Example: Future of Artificial Intelligence"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>


        {/* Content Type */}

        <div className="mt-7">

          <label className="font-semibold block mb-3 text-gray-800">
            Content Type
          </label>

          <div className="flex flex-wrap gap-3">

            {[
              "Blog",
              "Article",
              "Social Media Post",
              "Product Description",
            ].map((type) => (

              <button
                key={type}
                onClick={() => setContentType(type)}
                className={`px-5 py-3 rounded-xl border transition ${
                  contentType === type
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                }`}
              >
                {type}
              </button>

            ))}

          </div>

        </div>


        {/* Tone */}

        <div className="mt-7">

          <label className="font-semibold block mb-3 text-gray-800">
            Tone
          </label>

          <div className="flex flex-wrap gap-3">

            {[
              "Professional",
              "Casual",
              "Friendly",
              "Formal",
            ].map((item) => (

              <button
                key={item}
                onClick={() => setTone(item)}
                className={`px-5 py-3 rounded-xl border transition ${
                  tone === item
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-purple-400"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>


        {/* Length */}

        <div className="mt-7">

          <label className="font-semibold block mb-3 text-gray-800">
            Content Length
          </label>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => setLength("Short")}
              className={`px-5 py-3 rounded-xl border transition ${
                length === "Short"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
              }`}
            >
              Short
            </button>

            <button
              onClick={() => setLength("Medium")}
              className={`px-5 py-3 rounded-xl border transition ${
                length === "Medium"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
              }`}
            >
              Medium
            </button>

            <button
              onClick={() => setLength("Long")}
              className={`px-5 py-3 rounded-xl border transition ${
                length === "Long"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
              }`}
            >
              Long
            </button>

          </div>

        </div>


        {/* Generate */}

        <button
          onClick={generateContent}
          disabled={loading}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >

          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Content
            </>
          )}

        </button>

      </div>


      {/* ======================================
          GENERATED CONTENT
      ====================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Generated Content
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your AI-generated content will appear here.
            </p>
          </div>


          {generatedContent && !loading && (
            <button
              onClick={copyContent}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              {copied ? (
                <>
                  <Check size={17} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={17} />
                  Copy
                </>
              )}
            </button>
          )}

        </div>


        {/* Loading */}

        {loading && (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-gray-400">

            <Loader2
              size={35}
              className="animate-spin text-blue-600 mb-4"
            />

            <p>
              AI is generating your content...
            </p>

          </div>
        )}


        {/* Empty */}

        {!loading && !generatedContent && (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center text-gray-400">

            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Sparkles size={28} />
            </div>

            <h3 className="font-semibold text-gray-700">
              No content generated yet
            </h3>

            <p className="text-sm mt-2">
              Enter a topic and click Generate Content.
            </p>

          </div>
        )}


        {/* Generated Result */}

        {!loading && generatedContent && (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">

            <div className="whitespace-pre-wrap text-gray-800 leading-7">
              {generatedContent}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ArticleGenerator;