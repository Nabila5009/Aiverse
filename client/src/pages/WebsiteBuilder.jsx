import { useState } from "react";
import {
  Globe2,
  Sparkles,
  Copy,
  Check,
  Loader2,
  Code2,
  Eye,
} from "lucide-react";
import api from "../services/api";

function WebsiteBuilder() {
  const [description, setDescription] = useState("");
  const [websiteType, setWebsiteType] = useState("Landing Page");
  const [technology, setTechnology] = useState("HTML + CSS + JavaScript");

  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("preview");

  // ==========================================
  // GENERATE WEBSITE
  // ==========================================

  const generateWebsite = async () => {
    if (!description.trim()) {
      alert("Please describe the website you want to build.");
      return;
    }

    setLoading(true);
    setGeneratedCode("");
    setCopied(false);

    const prompt = `
You are an expert web developer and UI/UX designer.

Create a complete, modern, responsive website based on the following requirement.

Website Requirement:
${description}

Website Type:
${websiteType}

Technology:
${technology}

IMPORTANT RULES:

1. Return ONLY the complete website code.
2. Do not add explanations.
3. Do not use markdown code fences.
4. Make the website fully responsive.
5. Use a professional modern design.
6. Include all necessary sections based on the requirement.
7. Include realistic sample content.
8. Use proper semantic HTML.
9. If using HTML + CSS + JavaScript, return ONE complete HTML file.
10. Put CSS inside a <style> tag.
11. Put JavaScript inside a <script> tag.
12. Do not use external backend services.
13. Make sure the generated code can run directly in a browser.
`;

    try {
      const response = await api.post("/ai/chat", {
        message: prompt,
      });

      setGeneratedCode(response.data.reply);
      setView("preview");
    } catch (error) {
      console.error("Website Generation Error:", error);

      setGeneratedCode(
        error.response?.data?.message ||
          "Failed to generate website. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // COPY CODE
  // ==========================================

  const copyCode = async () => {
    if (!generatedCode) return;

    try {
      await navigator.clipboard.writeText(generatedCode);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy Error:", error);
    }
  };

  // ==========================================
  // PREVIEW
  // ==========================================

  const getPreviewDocument = () => {
    let code = generatedCode;

    // Remove markdown code fences if Gemini adds them
    code = code
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "");

    return code;
  };

  return (
    <div className="space-y-8">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
          <Globe2 size={25} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Website Builder
          </h1>

          <p className="text-gray-500 mt-1">
            Describe your idea and let AI build your website.
          </p>
        </div>

      </div>


      {/* ======================================
          WEBSITE CONFIGURATION
      ====================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        {/* Website Description */}

        <div>

          <label className="font-semibold block mb-3 text-gray-800">
            Describe Your Website
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Create a modern restaurant website with a hero section, menu, about us, customer reviews and contact section."
            rows={7}
            className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none resize-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition"
          />

        </div>


        {/* Website Type */}

        <div className="mt-7">

          <label className="font-semibold block mb-3 text-gray-800">
            Website Type
          </label>

          <div className="flex flex-wrap gap-3">

            {[
              "Landing Page",
              "Portfolio",
              "Business",
              "Restaurant",
              "E-commerce",
              "Blog",
            ].map((type) => (

              <button
                key={type}
                onClick={() => setWebsiteType(type)}
                className={`px-5 py-3 rounded-xl border transition ${
                  websiteType === type
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-cyan-400"
                }`}
              >
                {type}
              </button>

            ))}

          </div>

        </div>


        {/* Technology */}

        <div className="mt-7">

          <label className="font-semibold block mb-3 text-gray-800">
            Technology
          </label>

          <select
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition"
          >

            <option>
              HTML + CSS + JavaScript
            </option>

            <option>
              React + Tailwind CSS
            </option>

          </select>

        </div>


        {/* Generate Button */}

        <button
          onClick={generateWebsite}
          disabled={loading}
          className="mt-8 w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >

          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />

              Building Website...
            </>
          ) : (
            <>
              <Sparkles size={20} />

              Build Website
            </>
          )}

        </button>

      </div>


      {/* ======================================
          OUTPUT
      ====================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Output Header */}

        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              Website Output
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Preview your generated website or view the source code.
            </p>

          </div>


          {generatedCode && !loading && (

            <div className="flex items-center gap-2">

              <button
                onClick={() => setView("preview")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  view === "preview"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >

                <Eye size={17} />

                Preview

              </button>


              <button
                onClick={() => setView("code")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  view === "code"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >

                <Code2 size={17} />

                Code

              </button>


              <button
                onClick={copyCode}
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

            </div>

          )}

        </div>


        {/* ======================================
            LOADING
        ====================================== */}

        {loading && (

          <div className="min-h-[450px] flex flex-col items-center justify-center text-gray-400">

            <Loader2
              size={40}
              className="animate-spin text-cyan-600 mb-4"
            />

            <h3 className="font-semibold text-gray-700">
              AI is building your website...
            </h3>

            <p className="text-sm mt-2">
              This may take a few seconds.
            </p>

          </div>

        )}


        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {!loading && !generatedCode && (

          <div className="min-h-[450px] flex flex-col items-center justify-center text-center text-gray-400">

            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">

              <Globe2 size={30} />

            </div>

            <h3 className="font-semibold text-gray-700">
              No website generated yet
            </h3>

            <p className="text-sm mt-2">
              Describe your website and click Build Website.
            </p>

          </div>

        )}


        {/* ======================================
            PREVIEW
        ====================================== */}

        {!loading &&
          generatedCode &&
          view === "preview" && (

            <div className="bg-gray-100 p-4">

              <iframe
                title="Generated Website Preview"
                srcDoc={getPreviewDocument()}
                className="w-full h-[650px] bg-white rounded-xl border border-gray-200"
                sandbox="allow-scripts"
              />

            </div>

          )}


        {/* ======================================
            CODE
        ====================================== */}

        {!loading &&
          generatedCode &&
          view === "code" && (

            <div className="p-6">

              <pre className="bg-gray-950 text-gray-100 rounded-xl p-6 overflow-auto max-h-[650px] text-sm leading-6 whitespace-pre-wrap">
                <code>{generatedCode}</code>
              </pre>

            </div>

          )}

      </div>

    </div>
  );
}

export default WebsiteBuilder;