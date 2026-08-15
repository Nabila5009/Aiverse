import { useState } from "react";

import {
  Languages,
  ArrowLeftRight,
  Copy,
  Trash2,
  Sparkles,
  Check,
} from "lucide-react";

import api from "../services/api";

function Translator() {
  // =========================================================
  // STATE
  // =========================================================

  const [sourceLanguage, setSourceLanguage] =
    useState("English");

  const [targetLanguage, setTargetLanguage] =
    useState("Hindi");

  const [text, setText] = useState("");

  const [translation, setTranslation] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================================================
  // SUPPORTED LANGUAGES
  // =========================================================

  const languages = [
    "English",
    "Hindi",
    "Marathi",
    "Gujarati",
    "Tamil",
    "Telugu",
    "Bengali",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Urdu",
    "Arabic",
    "French",
    "German",
    "Spanish",
    "Italian",
    "Portuguese",
    "Russian",
    "Japanese",
    "Korean",
    "Chinese",
  ];

  // =========================================================
  // SWAP LANGUAGES
  // =========================================================

  const swapLanguages = () => {
    if (
      sourceLanguage === targetLanguage
    ) {
      return;
    }

    const oldSourceLanguage =
      sourceLanguage;

    const oldTargetLanguage =
      targetLanguage;

    setSourceLanguage(
      oldTargetLanguage
    );

    setTargetLanguage(
      oldSourceLanguage
    );

    // Swap text and translation too
    if (translation) {
      const oldText = text;

      setText(translation);
      setTranslation(oldText);
    }

    setError("");
    setCopied(false);
  };

  // =========================================================
  // TRANSLATE TEXT
  // =========================================================

  const translateText = async () => {
    // Clear previous error
    setError("");

    // Validate text
    if (!text.trim()) {
      setError(
        "Please enter some text to translate."
      );

      return;
    }

    // Validate languages
    if (
      sourceLanguage === targetLanguage
    ) {
      setError(
        "Please select two different languages."
      );

      return;
    }

    setLoading(true);
    setTranslation("");
    setCopied(false);

    try {
      console.log(
        `🌍 Translating ${sourceLanguage} → ${targetLanguage}`
      );

      // =====================================================
      // IMPORTANT
      //
      // Do NOT use /ai/chat here.
      //
      // Translator uses its own backend endpoint:
      //
      // POST /api/ai/translate
      // =====================================================

      const response = await api.post(
        "/ai/translate",
        {
          text: text.trim(),

          sourceLanguage,

          targetLanguage,
        },
        {
          timeout: 30000,
        }
      );

      console.log(
        "🌍 Translation response:",
        response.data
      );

      // =====================================================
      // CHECK RESPONSE
      // =====================================================

      if (
        !response.data ||
        !response.data.success
      ) {
        throw new Error(
          response.data?.message ||
            "Translation failed."
        );
      }

      if (
        !response.data.translation
      ) {
        throw new Error(
          "Translation service returned an empty response."
        );
      }

      // =====================================================
      // SHOW TRANSLATION
      // =====================================================

      setTranslation(
        response.data.translation.trim()
      );

      setError("");

    } catch (err) {
      console.error(
        "❌ Translation Error:",
        err
      );

      // =====================================================
      // SHOW ACTUAL BACKEND ERROR
      // =====================================================

      const backendMessage =
        err?.response?.data?.message;

      setTranslation("");

      setError(
        backendMessage ||
          err?.message ||
          "Translation service is temporarily unavailable. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // COPY TRANSLATION
  // =========================================================

  const copyTranslation =
    async () => {
      if (!translation) {
        return;
      }

      try {
        await navigator.clipboard.writeText(
          translation
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);

      } catch (err) {
        console.error(
          "❌ Copy failed:",
          err
        );

        setError(
          "Unable to copy translation."
        );
      }
    };

  // =========================================================
  // CLEAR EVERYTHING
  // =========================================================

  const clearAll = () => {
    setText("");

    setTranslation("");

    setError("");

    setCopied(false);
  };

  // =========================================================
  // CHARACTER COUNT
  // =========================================================

  const characterCount =
    text.length;

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="space-y-8 pb-10">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Languages size={25} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              AI Translator
            </h1>

            <p className="text-gray-500 mt-1">
              Translate your text instantly
              between multiple languages.
            </p>

          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN TRANSLATOR CARD
      ===================================================== */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

        {/* ===================================================
            LANGUAGE SELECTORS
        =================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">

          {/* SOURCE LANGUAGE */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Translate from
            </label>

            <select
              value={sourceLanguage}
              onChange={(e) => {
                setSourceLanguage(
                  e.target.value
                );

                setError("");
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
            >

              {languages.map(
                (language) => (
                  <option
                    key={language}
                    value={language}
                  >
                    {language}
                  </option>
                )
              )}

            </select>

          </div>

          {/* SWAP BUTTON */}

          <button
            type="button"
            onClick={swapLanguages}
            className="w-11 h-11 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 flex items-center justify-center transition"
            title="Swap languages"
          >
            <ArrowLeftRight
              size={19}
            />
          </button>

          {/* TARGET LANGUAGE */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Translate to
            </label>

            <select
              value={targetLanguage}
              onChange={(e) => {
                setTargetLanguage(
                  e.target.value
                );

                setError("");
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
            >

              {languages.map(
                (language) => (
                  <option
                    key={language}
                    value={language}
                  >
                    {language}
                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {/* ===================================================
            TRANSLATION BOXES
        =================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-7">

          {/* =================================================
              SOURCE TEXT
          ================================================= */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="text-sm font-semibold text-gray-700">
                {sourceLanguage}
              </label>

              <span className="text-xs text-gray-400">
                {characterCount} characters
              </span>

            </div>

            <textarea
              value={text}
              onChange={(e) => {
                setText(
                  e.target.value
                );

                if (error) {
                  setError("");
                }
              }}
              placeholder={`Enter text in ${sourceLanguage}...`}
              className="w-full min-h-[300px] border border-gray-200 rounded-2xl px-5 py-4 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800"
            />

          </div>

          {/* =================================================
              TRANSLATED TEXT
          ================================================= */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="text-sm font-semibold text-gray-700">
                {targetLanguage}
              </label>

              {translation && (
                <button
                  type="button"
                  onClick={
                    copyTranslation
                  }
                  className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
                >

                  {copied ? (
                    <>
                      <Check
                        size={15}
                      />

                      Copied
                    </>
                  ) : (
                    <>
                      <Copy
                        size={15}
                      />

                      Copy
                    </>
                  )}

                </button>
              )}

            </div>

            <div className="w-full min-h-[300px] border border-gray-200 rounded-2xl px-5 py-4 bg-gray-50">

              {/* LOADING */}

              {loading ? (

                <div className="h-[260px] flex flex-col items-center justify-center text-center">

                  <Sparkles
                    size={32}
                    className="text-blue-600 animate-pulse"
                  />

                  <p className="text-gray-600 font-medium mt-4">
                    Translating...
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Please wait while your text
                    is being translated.
                  </p>

                </div>

              ) : translation ? (

                /* TRANSLATION */

                <div className="h-[260px] overflow-y-auto">

                  <p className="text-gray-800 whitespace-pre-wrap leading-7">
                    {translation}
                  </p>

                </div>

              ) : (

                /* EMPTY STATE */

                <div className="h-[260px] flex items-center justify-center text-center">

                  <div>

                    <Languages
                      size={36}
                      className="mx-auto text-gray-300"
                    />

                    <p className="text-gray-400 mt-3">
                      Your translation will
                      appear here.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* ===================================================
            ACTION BUTTONS
        =================================================== */}

        <div className="flex flex-col sm:flex-row gap-3 mt-7">

          {/* TRANSLATE */}

          <button
            type="button"
            onClick={translateText}
            disabled={
              !text.trim() ||
              loading
            }
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition ${
              text.trim() &&
              !loading
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-[1.01]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >

            <Sparkles size={19} />

            {loading
              ? "Translating..."
              : "Translate"}

          </button>

          {/* CLEAR */}

          <button
            type="button"
            onClick={clearAll}
            className="sm:w-32 flex items-center justify-center gap-2 py-4 rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:bg-red-50 hover:text-red-600 text-gray-600 font-semibold transition"
          >

            <Trash2 size={18} />

            Clear

          </button>

        </div>

      </div>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <div>

        <h2 className="text-xl font-bold text-gray-900">
          Translation Features
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Translate your content quickly and
          easily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

          {/* FEATURE 1 */}

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Languages
                size={22}
              />
            </div>

            <h3 className="font-semibold text-gray-900 mt-5">
              Multiple Languages
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Translate between popular Indian
              and international languages.
            </p>

          </div>

          {/* FEATURE 2 */}

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles
                size={22}
              />
            </div>

            <h3 className="font-semibold text-gray-900 mt-5">
              Fast Translation
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Get your translated content quickly
              without using the Gemini chat endpoint.
            </p>

          </div>

          {/* FEATURE 3 */}

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Copy
                size={22}
              />
            </div>

            <h3 className="font-semibold text-gray-900 mt-5">
              Easy to Copy
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Copy the translated result with
              one click.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Translator;