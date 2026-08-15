import heroImage from "../assets/hero-ai.png";

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 bg-gradient-to-br from-white via-blue-50 to-purple-50">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-[140px] opacity-30"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-300 rounded-full blur-[160px] opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-200 rounded-full blur-[220px] opacity-20"></div>

      {/* Left Side */}
      <div className="relative z-10 max-w-2xl text-center lg:text-left">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
          Build AI Content
          <br />
          in Seconds
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
          Generate articles, blogs, images, resumes and much more using the power
          of Artificial Intelligence.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex justify-center lg:justify-start gap-4">

          <button className="bg-blue-600 text-white px-7 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </button>

          <button className="bg-white border border-gray-300 px-7 py-3 rounded-xl shadow-sm hover:bg-gray-100 transition duration-300">
            Watch Demo
          </button>

        </div>

      </div>

      {/* Right Side */}
      <div className="relative z-10 mt-16 lg:mt-0 lg:w-1/2 flex justify-center items-center">

        <img
          src={heroImage}
          alt="AI Illustration"
          className="w-full max-w-3xl object-contain drop-shadow-2xl transition-all duration-500 hover:-translate-y-5 hover:scale-105 hover:drop-shadow-[0_25px_50px_rgba(59,130,246,0.35)]"
        />

      </div>

    </section>
  );
}

export default Hero;