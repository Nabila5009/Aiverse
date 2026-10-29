import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <header className="w-full px-5 md:px-8">

      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-violet-100 bg-white/60 py-4 backdrop-blur-sm md:justify-between">

        {/* Left Section */}
        <div>
          <Link to="/" className="flex items-center gap-1.5">
            <Sparkles className="h-5 w-5 text-[#6D4AFF]" />
            <h1 className="bg-gradient-to-r from-[#0F172A] to-[#3b3372] bg-clip-text text-xl font-extrabold tracking-tight text-transparent md:text-2xl">
              AIVerse
            </h1>
          </Link>
        </div>

        {/* Center Section */}
        <div className="flex gap-7 text-[15px] font-medium text-[#475569]">
          <Link to="/" className="transition hover:text-[#6D4AFF]">
            Home
          </Link>

          <Link to="/" className="transition hover:text-[#6D4AFF]">
            AI Tools
          </Link>

          <Link to="/pricing" className="transition hover:text-[#6D4AFF]">
            Pricing
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-[#0F172A] transition duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:text-[#6D4AFF] hover:shadow-[0_10px_24px_-10px_rgba(109,74,255,0.35)]"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-gradient-to-r from-[#6D4AFF] to-[#7C5CFF] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-8px_rgba(109,74,255,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(109,74,255,0.55)]"
          >
            Get Started
          </Link>
        </div>

      </nav>

    </header>
  );
}

export default Navbar;
