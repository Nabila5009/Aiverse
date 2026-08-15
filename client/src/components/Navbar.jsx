import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b">

      {/* Left Section */}
      <div>
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600">
            AIVerse
          </h1>
        </Link>
      </div>

      {/* Center Section */}
      <div className="flex gap-8">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        <Link to="/" className="hover:text-blue-600 transition">
          AI Tools
        </Link>

        <Link to="/pricing" className="hover:text-blue-600 transition">
          Pricing
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex gap-4">

        <Link
          to="/login"
          className="px-5 py-2 rounded-lg hover:text-blue-600 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;