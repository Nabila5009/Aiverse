import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../api/authApi";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/register", formData);

      alert(res.data.message);

      console.log(res.data);

      // Clear Form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.log(error);

      console.log(error.response);

    alert(error.response?.data?.message || error.message);
}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-3">
          Join AIVerse and unlock powerful AI tools.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Name */}

          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* Email */}

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Create Account
          </button>

        </form>

        {/* Login */}

        <p className="text-center mt-6 text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;