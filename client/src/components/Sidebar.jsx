import {
  LayoutDashboard,
  MessageCircle,
  PenLine,
  Code2,
  Globe2,
  BarChart3,
  LayoutTemplate,
  Image,
  Languages,
  FileSearch,
  Eraser,
  Map,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "AI Chat",
      icon: <MessageCircle size={20} />,
      path: "/dashboard/ai-chat",
    },
    {
      name: "Content Writer",
      icon: <PenLine size={20} />,
      path: "/dashboard/content-writer",
    },
    {
      name: "Code Generator",
      icon: <Code2 size={20} />,
      path: "/dashboard/code-generator",
    },
    {
      name: "Website Builder",
      icon: <Globe2 size={20} />,
      path: "/dashboard/website-builder",
    },
    {
      name: "Data Analysis",
      icon: <BarChart3 size={20} />,
      path: "/dashboard/data-analysis",
    },
    {
      name: "Templates",
      icon: <LayoutTemplate size={20} />,
      path: "/dashboard/templates",
    },
    {
      name: "Translator",
      icon: <Languages size={20} />,
      path: "/dashboard/translator",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="px-7 py-7">
        <h1 className="text-3xl font-extrabold text-blue-600">
          AIVerse
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          AI tools for everyone
        </p>
      </div>

      {/* User Profile */}
      <div className="px-5 mb-6">
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 truncate">
              {user?.name || "User"}
            </h2>

            <p className="text-sm text-gray-500">
              Free Plan
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Workspace
        </p>

        <div className="space-y-1">

          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {menu.icon}

              <span>
                {menu.name}
              </span>
            </NavLink>
          ))}

        </div>

      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-100">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
        >
          <LogOut size={19} />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;