import { useState, useRef } from "react";
import { toPng } from "html-to-image";

import {
  Sparkles,
  Gift,
  Heart,
  PartyPopper,
  Send,
  Palette,
  WandSparkles,
  Download,
  RefreshCw,
} from "lucide-react";

import api from "../services/api";

function Templates() {
  // =========================================================
  // STATE
  // =========================================================

  const [requirement, setRequirement] = useState("");
  const [selectedType, setSelectedType] = useState("Festival");
  const [selectedTheme, setSelectedTheme] = useState("Colorful");

  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generationMode, setGenerationMode] = useState("");

  // Used for converting the visible card into PNG
  const cardRef = useRef(null);

  // =========================================================
  // TEMPLATE TYPES
  // =========================================================

  const templateTypes = [
    {
      name: "Festival",
      icon: Gift,
      description: "Eid, Diwali, Holi, Christmas and more",
    },
    {
      name: "Wedding",
      icon: Heart,
      description: "Wedding, Nikah, Engagement and Reception",
    },
    {
      name: "Invitation",
      icon: Send,
      description: "Birthday, party and event invitations",
    },
    {
      name: "Greeting",
      icon: PartyPopper,
      description: "Wishes, celebrations and special occasions",
    },
  ];

  // =========================================================
  // THEMES
  // =========================================================

  const themes = [
    "Colorful",
    "Elegant",
    "Royal",
    "Minimal",
    "Festive",
    "Luxury",
  ];

  // =========================================================
  // THEME STYLES
  // =========================================================

  const themeStyles = {
    Colorful: {
      background:
        "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
    },

    Elegant: {
      background:
        "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800",
    },

    Royal: {
      background:
        "bg-gradient-to-br from-indigo-950 via-purple-800 to-amber-600",
    },

    Minimal: {
      background:
        "bg-gradient-to-br from-gray-100 via-white to-gray-200",
    },

    Festive: {
      background:
        "bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400",
    },

    Luxury: {
      background:
        "bg-gradient-to-br from-black via-gray-900 to-yellow-700",
    },
  };

  // =========================================================
  // EXTRACT USER DETAILS
  // =========================================================

  const extractDetails = (text) => {
    const value = text || "";

    const nameMatch = value.match(
      /(?:name|for|from|by)\s*[:=-]?\s*([A-Za-z][A-Za-z\s]{1,30})/i
    );

    const dateMatch = value.match(
      /(?:date|on)\s*[:=-]?\s*([0-9]{1,2}\s*[A-Za-z]+\s*[0-9]{0,4}|[A-Za-z]+\s*[0-9]{1,2}(?:\s*,\s*[0-9]{4})?)/i
    );

    const timeMatch = value.match(
      /(?:time|at)\s*[:=-]?\s*([0-9]{1,2}(?::[0-9]{2})?\s*(?:AM|PM|am|pm)?)/i
    );

    const locationMatch = value.match(
      /(?:location|venue|place)\s*[:=-]?\s*([A-Za-z0-9\s,.-]{2,60})/i
    );

    return {
      sender: nameMatch ? nameMatch[1].trim() : "",
      date: dateMatch ? dateMatch[1].trim() : "",
      time: timeMatch ? timeMatch[1].trim() : "",
      location: locationMatch
        ? locationMatch[1].trim()
        : "",
    };
  };

  // =========================================================
  // LOCAL CARD GENERATOR
  //
  // IMPORTANT:
  // This does NOT depend on Gemini.
  // Therefore the card works even when Gemini quota is 0.
  // =========================================================

  const createFallbackCard = () => {
    const text = requirement.toLowerCase();

    const details = extractDetails(requirement);

    let card = {
      title: "A Special Celebration",
      subtitle:
        "Wishing you happiness, joy and beautiful memories",
      message:
        "May this special occasion bring happiness, peace, prosperity and countless beautiful moments.",
      emoji: "✨",
      decoration: "✨ 🌸 ✨",
      event: "",
    };

    // =======================================================
    // DIWALI
    // =======================================================

    if (
      text.includes("diwali") ||
      text.includes("deepavali") ||
      text.includes("deepawali")
    ) {
      card = {
        title: "Happy Diwali",
        subtitle: "Festival of Lights",
        message:
          "May the festival of lights fill your home with happiness, prosperity, peace and endless blessings. Wishing you and your family a beautiful and joyful Diwali!",
        emoji: "🪔",
        decoration: "✨ 🪔 ✨",
        event: "Diwali Celebration",
      };
    }

    // =======================================================
    // EID
    // =======================================================

    else if (text.includes("eid")) {
      card = {
        title: "Eid Mubarak",
        subtitle:
          "May your Eid be filled with blessings",
        message:
          "May Allah bless you and your family with happiness, peace, prosperity and countless blessings. Wishing you a beautiful and blessed Eid Mubarak!",
        emoji: "🌙",
        decoration: "✨ 🌙 ✨",
        event: "Eid Celebration",
      };
    }

    // =======================================================
    // HOLI
    // =======================================================

    else if (text.includes("holi")) {
      card = {
        title: "Happy Holi",
        subtitle: "Festival of Colors",
        message:
          "May your life be filled with vibrant colors of happiness, love, friendship and beautiful memories. Have a wonderful and colorful Holi!",
        emoji: "🎨",
        decoration: "🌈 🎨 🌸",
        event: "Holi Celebration",
      };
    }

    // =======================================================
    // CHRISTMAS
    // =======================================================

    else if (
      text.includes("christmas") ||
      text.includes("xmas")
    ) {
      card = {
        title: "Merry Christmas",
        subtitle:
          "Warm wishes for a joyful Christmas",
        message:
          "May your Christmas be filled with love, laughter, peace and beautiful moments with the people you love.",
        emoji: "🎄",
        decoration: "🎄 🎁 ✨",
        event: "Christmas Celebration",
      };
    }

    // =======================================================
    // BIRTHDAY
    // =======================================================

    else if (
      text.includes("birthday") ||
      text.includes("bday")
    ) {
      card = {
        title: "Happy Birthday",
        subtitle:
          "Wishing you a wonderful year ahead",
        message:
          "May your special day be filled with happiness, laughter, love and unforgettable memories. Wishing you success and beautiful moments in the year ahead!",
        emoji: "🎂",
        decoration: "🎈 🎂 🎉",
        event: "Birthday Celebration",
      };
    }

    // =======================================================
    // WEDDING
    // =======================================================

    else if (
      text.includes("wedding") ||
      text.includes("marriage")
    ) {
      card = {
        title: "Wedding Invitation",
        subtitle:
          "Together with their families",
        message:
          "With great joy, we invite you to celebrate this beautiful beginning of a lifetime of love, happiness and togetherness.",
        emoji: "💍",
        decoration: "💐 💍 ❤️",
        event: "Wedding Ceremony",
      };
    }

    // =======================================================
    // NIKAH
    // =======================================================

    else if (text.includes("nikah")) {
      card = {
        title: "Nikah Mubarak",
        subtitle:
          "A beautiful beginning of a blessed journey",
        message:
          "May Allah bless this beautiful union with love, mercy, happiness and countless blessings. Your presence will make this occasion even more special.",
        emoji: "🤍",
        decoration: "🌙 💍 ✨",
        event: "Nikah Ceremony",
      };
    }

    // =======================================================
    // ENGAGEMENT
    // =======================================================

    else if (text.includes("engagement")) {
      card = {
        title: "Engagement Celebration",
        subtitle: "A beautiful beginning",
        message:
          "Join us as we celebrate the beginning of a beautiful journey filled with love, happiness and togetherness.",
        emoji: "💍",
        decoration: "💖 💍 ✨",
        event: "Engagement Celebration",
      };
    }

    // =======================================================
    // ANNIVERSARY
    // =======================================================

    else if (text.includes("anniversary")) {
      card = {
        title: "Happy Anniversary",
        subtitle:
          "Celebrating love and togetherness",
        message:
          "Wishing you both another beautiful year filled with love, laughter, happiness and countless precious memories together.",
        emoji: "❤️",
        decoration: "❤️ 🌹 ✨",
        event: "Anniversary Celebration",
      };
    }

    // =======================================================
    // INVITATION
    // =======================================================

    else if (
      selectedType === "Invitation" ||
      text.includes("invitation") ||
      text.includes("invite")
    ) {
      card = {
        title: "You're Invited",
        subtitle:
          "Join us for a special celebration",
        message:
          "We would be delighted to have you join us and make this special occasion even more memorable.",
        emoji: "💌",
        decoration: "🎉 💌 ✨",
        event: "Special Event",
      };
    }

    // =======================================================
    // GREETING
    // =======================================================

    else if (selectedType === "Greeting") {
      card = {
        title: "Warm Wishes",
        subtitle: "A special message for you",
        message:
          "Sending you heartfelt wishes filled with happiness, positivity, love and beautiful moments.",
        emoji: "💖",
        decoration: "✨ 🌸 💖",
        event: "",
      };
    }

    return {
      ...card,
      sender: details.sender,
      date: details.date,
      time: details.time,
      location: details.location,
    };
  };

  // =========================================================
  // GENERATE TEMPLATE
  //
  // LOCAL CARD IS CREATED FIRST.
  //
  // This guarantees output even when:
  // - Gemini quota exceeded
  // - API unavailable
  // - Network error
  // - Backend error
  // =========================================================

  const generateTemplate = async () => {
    if (!requirement.trim()) {
      setError("Please describe the card you want.");
      return;
    }

    setLoading(true);
    setError("");
    setGenerated(null);
    setGenerationMode("");

    // =======================================================
    // STEP 1
    // Immediately create a local card.
    // =======================================================

    const localCard = createFallbackCard();

    // =======================================================
    // STEP 2
    // Try Gemini only as an enhancement.
    // =======================================================

    const prompt = `
You are a professional greeting card and invitation designer.

Create a personalized card from the user's requirements.

Card Type:
${selectedType}

Design Style:
${selectedTheme}

User Requirement:
${requirement}

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add explanations.

Use exactly:

{
  "title": "Main title",
  "subtitle": "Subtitle",
  "message": "Personalized message",
  "sender": "",
  "event": "",
  "date": "",
  "time": "",
  "location": "",
  "emoji": "✨",
  "decoration": "✨ 🌸 ✨"
}

Rules:
- Follow the user's exact occasion.
- Use the user's name if provided.
- Never invent a name.
- Include date only if provided.
- Include time only if provided.
- Include location only if provided.
- Create a beautiful personalized message.
- Return valid JSON only.
`;

    try {
      // =====================================================
      // Give user immediate local output.
      // =====================================================

      setGenerated(localCard);
      setGenerationMode("Instant Generated");

      // =====================================================
      // Try Gemini with a timeout.
      //
      // If Gemini takes too long or quota is exceeded,
      // local card remains visible.
      // =====================================================

      const response = await Promise.race([
        api.post(
          "/ai/chat",
          {
            message: prompt,
          },
          {
            timeout: 12000,
          }
        ),

        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "AI request timed out"
                )
              ),
            12000
          )
        ),
      ]);

      // =====================================================
      // Gemini success
      // =====================================================

      if (
        response?.data?.success &&
        response?.data?.reply
      ) {
        let cleaned =
          String(response.data.reply).trim();

        // Remove markdown code fences
        cleaned = cleaned
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/\s*```$/i, "")
          .trim();

        // Extract JSON object
        const firstBrace =
          cleaned.indexOf("{");

        const lastBrace =
          cleaned.lastIndexOf("}");

        if (
          firstBrace !== -1 &&
          lastBrace !== -1
        ) {
          cleaned = cleaned.substring(
            firstBrace,
            lastBrace + 1
          );
        }

        const aiCard = JSON.parse(cleaned);

        const finalCard = {
          title:
            aiCard.title ||
            localCard.title,

          subtitle:
            aiCard.subtitle ||
            localCard.subtitle,

          message:
            aiCard.message ||
            localCard.message,

          sender:
            aiCard.sender ||
            localCard.sender,

          event:
            aiCard.event ||
            localCard.event,

          date:
            aiCard.date ||
            localCard.date,

          time:
            aiCard.time ||
            localCard.time,

          location:
            aiCard.location ||
            localCard.location,

          emoji:
            aiCard.emoji ||
            localCard.emoji,

          decoration:
            aiCard.decoration ||
            localCard.decoration,
        };

        // Replace local card with AI card
        setGenerated(finalCard);
        setGenerationMode("AI Generated");
      }
    } catch (err) {
      // =====================================================
      // Gemini failed.
      //
      // DO NOT remove the card.
      // Local card is already displayed.
      // =====================================================

      console.warn(
        "Gemini unavailable. Keeping local card:",
        err?.message || err
      );

      setGenerated(localCard);
      setGenerationMode("Instant Generated");

      // IMPORTANT:
      // Do not show Gemini quota error.
      setError("");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // DOWNLOAD CARD AS PNG
  // =========================================================

  const downloadCard = async () => {
    if (!generated) {
      return;
    }

    if (!cardRef.current) {
      setError(
        "Card is not ready for download."
      );
      return;
    }

    try {
      setError("");

      const dataUrl = await toPng(
        cardRef.current,
        {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor:
            selectedTheme === "Minimal"
              ? "#ffffff"
              : undefined,
        }
      );

      const safeTitle = (
        generated.title ||
        "aiverse-card"
      )
        .replace(/[^a-z0-9]/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

      const fileName =
        `${safeTitle || "aiverse-card"}.png`;

      const link =
        document.createElement("a");

      link.download = fileName;
      link.href = dataUrl;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      console.log(
        `✅ Downloaded: ${fileName}`
      );
    } catch (err) {
      console.error(
        "❌ PNG Download Error:",
        err
      );

      setError(
        "Could not download the card image. Please try again."
      );
    }
  };

  // =========================================================
  // CURRENT THEME
  // =========================================================

  const currentTheme =
    themeStyles[selectedTheme] ||
    themeStyles.Colorful;

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

          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <WandSparkles size={25} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              AI Templates
            </h1>

            <p className="text-gray-500 mt-1">
              Create beautiful personalized cards
              for every occasion.
            </p>

          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

          <div className="flex items-center gap-2 mb-6">

            <Sparkles
              size={20}
              className="text-purple-600"
            />

            <h2 className="text-xl font-bold text-gray-900">
              Create your card
            </h2>

          </div>

          {/* =================================================
              CARD TYPE
          ================================================= */}

          <div>

            <label className="font-semibold text-gray-900">
              Card Type
            </label>

            <div className="grid grid-cols-2 gap-3 mt-4">

              {templateTypes.map(
                (template) => {

                  const Icon =
                    template.icon;

                  const active =
                    selectedType ===
                    template.name;

                  return (
                    <button
                      key={template.name}
                      type="button"
                      onClick={() =>
                        setSelectedType(
                          template.name
                        )
                      }
                      className={`text-left p-4 rounded-2xl border transition ${
                        active
                          ? "border-purple-500 bg-purple-50 shadow-sm"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >

                      <Icon
                        size={22}
                        className={
                          active
                            ? "text-purple-600"
                            : "text-gray-500"
                        }
                      />

                      <h3 className="font-semibold mt-3 text-gray-900">
                        {template.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {template.description}
                      </p>

                    </button>
                  );
                }
              )}

            </div>

          </div>

          {/* =================================================
              DESIGN STYLE
          ================================================= */}

          <div className="mt-7">

            <div className="flex items-center gap-2">

              <Palette
                size={18}
                className="text-purple-600"
              />

              <label className="font-semibold text-gray-900">
                Design Style
              </label>

            </div>

            <div className="flex flex-wrap gap-2 mt-4">

              {themes.map((theme) => {

                const active =
                  selectedTheme === theme;

                return (
                  <button
                    key={theme}
                    type="button"
                    onClick={() =>
                      setSelectedTheme(
                        theme
                      )
                    }
                    className={`px-4 py-2 rounded-full border text-sm transition ${
                      active
                        ? "bg-purple-600 text-white border-purple-600"
                        : "border-gray-200 hover:border-purple-400 text-gray-700"
                    }`}
                  >
                    {theme}
                  </button>
                );
              })}

            </div>

          </div>

          {/* =================================================
              USER REQUIREMENT
          ================================================= */}

          <div className="mt-7">

            <label className="font-semibold text-gray-900">
              Tell us what you want
            </label>

            <textarea
              value={requirement}
              onChange={(e) =>
                setRequirement(
                  e.target.value
                )
              }
              rows={7}
              placeholder={`Example:

Create a beautiful Diwali invitation card.

Name: Nabila
Message: Happy Diwali to everyone
Date: 20 October
Time: 8 PM
Location: Mumbai`}
              className="w-full mt-3 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 resize-none"
            />

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* =================================================
              GENERATE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={generateTemplate}
            disabled={
              !requirement.trim() ||
              loading
            }
            className={`mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition ${
              requirement.trim() &&
              !loading
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:scale-[1.01]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >

            {loading ? (
              <>
                <RefreshCw
                  size={20}
                  className="animate-spin"
                />

                Creating your card...
              </>
            ) : (
              <>
                <Sparkles size={20} />

                Generate Card with AI
              </>
            )}

          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Your card will be generated even if AI
            service is temporarily unavailable.
          </p>

        </div>

        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div className="bg-gray-50 rounded-3xl border border-gray-100 p-7">

          {/* PREVIEW HEADER */}

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Card Preview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your personalized card appears here.
              </p>

            </div>

            {generated && (
              <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
                {generationMode}
              </div>
            )}

          </div>

          {/* =================================================
              PREVIEW
          ================================================= */}

          <div className="min-h-[600px] flex items-center justify-center">

            {/* EMPTY STATE */}

            {!generated && !loading && (
              <div className="text-center text-gray-400">

                <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center shadow-sm">

                  <Sparkles
                    size={30}
                    className="text-purple-400"
                  />

                </div>

                <h3 className="text-lg font-semibold text-gray-600 mt-5">
                  Your card is waiting
                </h3>

                <p className="text-sm mt-2 max-w-sm">
                  Describe your card and click
                  "Generate Card with AI".
                </p>

              </div>
            )}

            {/* LOADING */}

            {loading && (
              <div className="text-center">

                <RefreshCw
                  size={42}
                  className="mx-auto text-purple-600 animate-spin"
                />

                <h3 className="text-lg font-semibold text-gray-700 mt-5">
                  Creating your card...
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Designing something beautiful for you.
                </p>

              </div>
            )}

            {/* GENERATED CARD */}

            {generated && !loading && (
              <div className="w-full flex flex-col items-center">

                {/* =================================================
                    ACTUAL DOWNLOADABLE CARD
                ================================================= */}

                <div
                  ref={cardRef}
                  className={`
                    relative
                    w-full
                    max-w-md
                    min-h-[560px]
                    rounded-[32px]
                    overflow-hidden
                    shadow-2xl
                    ${currentTheme.background}
                    ${
                      selectedTheme ===
                      "Minimal"
                        ? "text-gray-900"
                        : "text-white"
                    }
                    p-8
                    flex
                    items-center
                    justify-center
                    text-center
                  `}
                >

                  {/* DECORATIVE BACKGROUND */}

                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10" />

                  <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10" />

                  <div className="absolute top-8 left-8 text-2xl">
                    ✨
                  </div>

                  <div className="absolute top-12 right-8 text-2xl">
                    ✨
                  </div>

                  <div className="absolute bottom-10 right-10 text-2xl">
                    ✨
                  </div>

                  <div className="absolute bottom-12 left-10 text-xl">
                    ✨
                  </div>

                  {/* CARD CONTENT */}

                  <div className="relative z-10 w-full">

                    {/* EMOJI */}

                    <div className="text-6xl mb-5">
                      {generated.emoji}
                    </div>

                    {/* CARD TYPE */}

                    <p
                      className={`uppercase tracking-[0.3em] text-xs font-semibold ${
                        selectedTheme ===
                        "Minimal"
                          ? "text-gray-500"
                          : "text-white/80"
                      }`}
                    >
                      {selectedType}
                    </p>

                    {/* TITLE */}

                    <h2
                      className={`text-4xl md:text-5xl font-bold mt-5 leading-tight ${
                        selectedTheme ===
                        "Minimal"
                          ? "text-gray-900"
                          : "text-white"
                      }`}
                    >
                      {generated.title}
                    </h2>

                    {/* SUBTITLE */}

                    {generated.subtitle && (
                      <p
                        className={`mt-3 text-base ${
                          selectedTheme ===
                          "Minimal"
                            ? "text-gray-600"
                            : "text-white/90"
                        }`}
                      >
                        {generated.subtitle}
                      </p>
                    )}

                    {/* DIVIDER */}

                    <div
                      className={`w-24 h-px mx-auto my-6 ${
                        selectedTheme ===
                        "Minimal"
                          ? "bg-gray-400"
                          : "bg-white/50"
                      }`}
                    />

                    {/* MESSAGE */}

                    <p
                      className={`text-lg leading-8 ${
                        selectedTheme ===
                        "Minimal"
                          ? "text-gray-700"
                          : "text-white"
                      }`}
                    >
                      {generated.message}
                    </p>

                    {/* EVENT DETAILS */}

                    {(generated.event ||
                      generated.date ||
                      generated.time ||
                      generated.location) && (
                      <div
                        className={`mt-7 p-4 rounded-2xl ${
                          selectedTheme ===
                          "Minimal"
                            ? "bg-black/5"
                            : "bg-white/15 backdrop-blur-sm"
                        }`}
                      >

                        {generated.event && (
                          <p className="font-semibold">
                            {generated.event}
                          </p>
                        )}

                        {generated.date && (
                          <p className="text-sm mt-1">
                            📅 {generated.date}
                          </p>
                        )}

                        {generated.time && (
                          <p className="text-sm mt-1">
                            🕐 {generated.time}
                          </p>
                        )}

                        {generated.location && (
                          <p className="text-sm mt-1">
                            📍 {generated.location}
                          </p>
                        )}

                      </div>
                    )}

                    {/* SENDER */}

                    {generated.sender && (
                      <div className="mt-8">

                        <p
                          className={`text-sm ${
                            selectedTheme ===
                            "Minimal"
                              ? "text-gray-500"
                              : "text-white/70"
                          }`}
                        >
                          With warm wishes
                        </p>

                        <p
                          className={`text-2xl font-semibold mt-1 ${
                            selectedTheme ===
                            "Minimal"
                              ? "text-gray-900"
                              : "text-white"
                          }`}
                        >
                          {generated.sender}
                        </p>

                      </div>
                    )}

                    {/* DECORATION */}

                    <div className="mt-8 text-2xl">
                      {generated.decoration}
                    </div>

                  </div>

                </div>

                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="flex flex-wrap justify-center gap-3 mt-5">

                  {/* REGENERATE */}

                  <button
                    type="button"
                    onClick={generateTemplate}
                    disabled={loading}
                    className="px-5 py-3 rounded-xl border border-gray-200 bg-white hover:border-purple-400 font-medium flex items-center gap-2 transition text-gray-700"
                  >
                    <RefreshCw size={17} />

                    Regenerate
                  </button>

                  {/* DOWNLOAD */}

                  <button
                    type="button"
                    onClick={downloadCard}
                    className="px-5 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-medium flex items-center gap-2 transition"
                  >
                    <Download size={17} />

                    Download PNG
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Templates;