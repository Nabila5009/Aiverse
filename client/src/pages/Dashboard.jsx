import { useEffect, useState } from "react";

import {
  Sparkles,
  Image as ImageIcon,
  FileText,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  Plus,
  MessageCircle,
  PenLine,
  Code2,
  Globe2,
  LayoutTemplate,
  Languages,
} from "lucide-react";

import { Link } from "react-router-dom";

import api from "../services/api";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =====================================================
  // STATE
  // =====================================================

  const [statsPage, setStatsPage] = useState(0);

  const [statsData, setStatsData] = useState({
    total_creations: 0,
    content_created: 0,
    images_generated: 0,
    data_analyses: 0,
    ai_chats: 0,
    code_generated: 0,
    websites_built: 0,
    cards_created: 0,
  });

  const [recentCreations, setRecentCreations] =
    useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [statsResponse, recentResponse] =
        await Promise.all([
          api.get("/creations/stats"),
          api.get("/creations/recent"),
        ]);

      if (statsResponse.data.success) {
        setStatsData(
          statsResponse.data.stats
        );
      }

      if (recentResponse.data.success) {
        setRecentCreations(
          recentResponse.data.creations
        );
      }
    } catch (error) {
      console.error(
        "❌ Dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // STATS
  // =====================================================

  const stats = [
    {
      title: "Total Creations",
      value: statsData.total_creations,
      icon: <Sparkles size={21} />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },

    {
      title: "Content Created",
      value: statsData.content_created,
      icon: <FileText size={21} />,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },

    {
      title: "Images Generated",
      value: statsData.images_generated,
      icon: <ImageIcon size={21} />,
      bg: "bg-green-50",
      text: "text-green-600",
    },

    {
      title: "Data Analyses",
      value: statsData.data_analyses,
      icon: <BarChart3 size={21} />,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },

    {
      title: "AI Chats",
      value: statsData.ai_chats,
      icon: <MessageCircle size={21} />,
      bg: "bg-pink-50",
      text: "text-pink-600",
    },

    {
      title: "Code Generated",
      value: statsData.code_generated,
      icon: <Code2 size={21} />,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },

    {
      title: "Websites Built",
      value: statsData.websites_built,
      icon: <Globe2 size={21} />,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
    },

    {
      title: "Cards Created",
      value: statsData.cards_created,
      icon: <LayoutTemplate size={21} />,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
  ];

  // =====================================================
  // STATS CAROUSEL
  // =====================================================

  const statsPerPage = 4;

  const statsStart =
    statsPage * statsPerPage;

  const visibleStats = stats.slice(
    statsStart,
    statsStart + statsPerPage
  );

  const totalStatsPages = Math.ceil(
    stats.length / statsPerPage
  );

  const nextStats = () => {
    if (
      statsPage <
      totalStatsPages - 1
    ) {
      setStatsPage(statsPage + 1);
    }
  };

  const previousStats = () => {
    if (statsPage > 0) {
      setStatsPage(statsPage - 1);
    }
  };

  // =====================================================
  // AI TOOLS
  // =====================================================

  const [toolsPage, setToolsPage] =
    useState(0);

  const tools = [
    {
      name: "AI Chat",
      description:
        "Chat with AI and get instant answers.",
      icon: <MessageCircle size={23} />,
      bg: "bg-blue-50",
      text: "text-blue-600",
      path: "/dashboard/ai-chat",
    },

    {
      name: "Content Writer",
      description:
        "Generate articles, blogs and creative content.",
      icon: <PenLine size={23} />,
      bg: "bg-purple-50",
      text: "text-purple-600",
      path: "/dashboard/content-writer",
    },

    {
      name: "Code Generator",
      description:
        "Generate clean code using AI.",
      icon: <Code2 size={23} />,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      path: "/dashboard/code-generator",
    },

    {
      name: "Website Builder",
      description:
        "Create websites with AI.",
      icon: <Globe2 size={23} />,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      path: "/dashboard/website-builder",
    },

    {
      name: "Data Analysis",
      description:
        "Turn business data into useful insights.",
      icon: <BarChart3 size={23} />,
      bg: "bg-green-50",
      text: "text-green-600",
      path: "/dashboard/data-analysis",
    },

    {
      name: "Templates",
      description:
        "Create beautiful interactive cards.",
      icon: <LayoutTemplate size={23} />,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      path: "/dashboard/templates",
    },

    {
      name: "Translator",
      description:
        "Translate text between multiple languages.",
      icon: <Languages size={23} />,
      bg: "bg-orange-50",
      text: "text-orange-600",
      path: "/dashboard/translator",
    },
  ];

  const toolsPerPage = 4;

  const toolsStart =
    toolsPage * toolsPerPage;

  const visibleTools = tools.slice(
    toolsStart,
    toolsStart + toolsPerPage
  );

  const totalToolPages = Math.ceil(
    tools.length / toolsPerPage
  );

  const nextTools = () => {
    if (
      toolsPage <
      totalToolPages - 1
    ) {
      setToolsPage(toolsPage + 1);
    }
  };

  const previousTools = () => {
    if (toolsPage > 0) {
      setToolsPage(toolsPage - 1);
    }
  };

  // =====================================================
  // TOOL DISPLAY NAME
  // =====================================================

  const getToolName = (toolType) => {
    const names = {
      "ai-chat": "AI Chat",
      "content-writer": "Content Writer",
      "code-generator": "Code Generator",
      "image-generator": "Image Generator",
      "website-builder": "Website Builder",
      "data-analysis": "Data Analysis",
      templates: "Templates",
      translator: "Translator",
    };

    return (
      names[toolType] ||
      toolType
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome back,{" "}
            {user?.name || "User"} 👋
          </p>
        </div>

        <Link
          to="/dashboard/ai-chat"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          New Creation
        </Link>

      </header>

      {/* MAIN */}

      <main className="p-8">

        {/* WELCOME */}

        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white mb-8">

          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={22} />

            <span className="font-medium">
              Welcome to AIVerse
            </span>
          </div>

          <h2 className="text-3xl font-bold">
            Create something amazing with AI.
          </h2>

          <p className="text-blue-100 mt-3 max-w-xl">
            Chat, write content, generate code,
            analyze data, create images and much
            more — all in one place.
          </p>

        </section>

        {/* STATS */}

        <section className="relative mb-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {visibleStats.map((stat) => (

              <div
                key={stat.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >

                <div
                  className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.text} flex items-center justify-center mb-4`}
                >
                  {stat.icon}
                </div>

                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h3 className="text-3xl font-bold text-gray-900 mt-1">
                  {loading
                    ? "..."
                    : stat.value}
                </h3>

              </div>

            ))}

          </div>

          {/* PREVIOUS */}

          {statsPage > 0 && (
            <button
              onClick={previousStats}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition z-10"
            >
              <ArrowLeft size={17} />
            </button>
          )}

          {/* NEXT */}

          {statsPage <
            totalStatsPages - 1 && (
            <button
              onClick={nextStats}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition z-10"
            >
              <ArrowRight size={17} />
            </button>
          )}

        </section>

        {/* AI TOOLS */}

        <section>

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Explore AI Tools
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Choose a tool and start creating.
              </p>
            </div>

          </div>

          <div className="relative">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {visibleTools.map((tool) => (

                <Link
                  key={tool.name}
                  to={tool.path}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                >

                  <div
                    className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.text} flex items-center justify-center mb-5`}
                  >
                    {tool.icon}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {tool.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 min-h-[40px]">
                    {tool.description}
                  </p>

                  <div
                    className={`flex items-center gap-2 ${tool.text} text-sm font-medium mt-5`}
                  >
                    Open Tool

                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition"
                    />
                  </div>

                </Link>

              ))}

            </div>

            {toolsPage > 0 && (
              <button
                onClick={previousTools}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 transition z-10"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            {toolsPage <
              totalToolPages - 1 && (
              <button
                onClick={nextTools}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 transition z-10"
              >
                <ArrowRight size={18} />
              </button>
            )}

          </div>

        </section>

        {/* RECENT CREATIONS */}

        <section className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Creations
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your latest AI activity
              </p>
            </div>

          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading your creations...
            </div>
          ) : recentCreations.length === 0 ? (

            <div className="text-center py-14">

              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">

                <Sparkles
                  size={24}
                  className="text-gray-400"
                />

              </div>

              <h3 className="font-semibold text-gray-800">
                No creations yet
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Start using an AI tool and your
                creations will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {recentCreations.map(
                (creation) => (

                  <div
                    key={creation.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Sparkles size={19} />
                      </div>

                      <div>

                        <h3 className="font-semibold text-gray-900">
                          {creation.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {getToolName(
                            creation.tool_type
                          )}
                        </p>

                      </div>

                    </div>

                    <div className="text-xs text-gray-400">
                      {new Date(
                        creation.created_at
                      ).toLocaleString()}
                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;