import { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  Sparkles,
  Loader2,
} from "lucide-react";
import api from "../services/api";

function CodeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ==========================================
  // GENERATE CODE
  // ==========================================

  const generateCode = async () => {
    if (!prompt.trim()) {
      alert("Please describe what code you want to generate.");
      return;
    }

    setLoading(true);
    setGeneratedCode("");
    setCopied(false);

    const codePrompt = `
You are an expert software developer.

Generate clean, production-quality code based on the user's requirement.

User Requirement:
${prompt}

Programming Language / Technology:
${language}

Requirements:
- Return only the code.
- Do not include explanations before or after the code.
- Use best practices.
- Write clean and readable code.
- Add useful comments where necessary.
- Make sure the code is complete and runnable.
- Do not use markdown code fences.
`;

    try {
      const response = await api.post("/ai/chat", {
        message: codePrompt,
      });

      setGeneratedCode(response.data.reply);
    } catch (error) {
      console.error("Code Generation Error:", error);

      setGeneratedCode(
        error.response?.data?.message ||
          "Failed to generate code. Please try again."
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

  return (
    <div className="space-y-8">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Code2 size={25} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Code Generator
          </h1>

          <p className="text-gray-500 mt-1">
            Generate clean and reliable code using AI.
          </p>
        </div>

      </div>


      {/* ======================================
          INPUT SECTION
      ====================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        {/* Requirement */}

        <div>

          <label className="font-semibold block mb-3 text-gray-800">
            What do you want to build?
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Create a responsive React login page with email and password validation."
            rows={7}
            className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          />

        </div>


        {/* Language */}

        <div className="mt-7">

          <label className="font-semibold block mb-3 text-gray-800">
            Language / Technology
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          >

            <option>JavaScript</option>
            <option>React.js</option>
            <option>Node.js</option>
            <option>HTML & CSS</option>
            <option>Python</option>
            <option>Java</option>
            <option>C++</option>
            <option>SQL</option>
            <option>TypeScript</option>
            <option>PHP</option>

          </select>

        </div>


        {/* Generate Button */}

        <button
          onClick={generateCode}
          disabled={loading}
          className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >

          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />

              Generating Code...
            </>
          ) : (
            <>
              <Sparkles size={20} />

              Generate Code
            </>
          )}

        </button>

      </div>


      {/* ======================================
          OUTPUT SECTION
      ====================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Generated Code
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your AI-generated code will appear here.
            </p>

          </div>


          {generatedCode && !loading && (
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
                  Copy Code
                </>
              )}

            </button>
          )}

        </div>


        {/* Loading */}

        {loading && (

          <div className="min-h-[350px] flex flex-col items-center justify-center text-gray-400">

            <Loader2
              size={36}
              className="animate-spin text-indigo-600 mb-4"
            />

            <p>
              AI is generating your code...
            </p>

          </div>

        )}


        {/* Empty State */}

        {!loading && !generatedCode && (

          <div className="min-h-[350px] flex flex-col items-center justify-center text-center text-gray-400">

            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">

              <Code2 size={30} />

            </div>

            <h3 className="font-semibold text-gray-700">
              No code generated yet
            </h3>

            <p className="text-sm mt-2">
              Describe your requirement and generate code.
            </p>

          </div>

        )}


        {/* Generated Code */}

        {!loading && generatedCode && (

          <div className="relative">

            <pre className="bg-gray-950 text-gray-100 rounded-xl p-6 overflow-x-auto text-sm leading-6 whitespace-pre-wrap">
              <code>{generatedCode}</code>
            </pre>

          </div>

        )}

      </div>

    </div>
  );
}

export default CodeGenerator;