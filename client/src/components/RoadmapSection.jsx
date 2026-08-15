function RoadmapSection() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}

        <h2 className="text-4xl font-bold text-center">
          AI Career Roadmap
        </h2>

        <p className="text-gray-600 text-center mt-4">
          Build your personalized learning roadmap with AI.
        </p>

        {/* Form */}

        <div className="mt-12 bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

          {/* Career Goal */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Career Goal
            </label>

            <select className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500">

              <option>Frontend Developer</option>

              <option>Backend Developer</option>

              <option>Full Stack Developer</option>

              <option>Data Analyst</option>

              <option>Machine Learning Engineer</option>

            </select>

          </div>

          {/* Current Level */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Current Level
            </label>

            <div className="flex gap-6">

              <label>
                <input type="radio" name="level" />
                <span className="ml-2">Beginner</span>
              </label>

              <label>
                <input type="radio" name="level" />
                <span className="ml-2">Intermediate</span>
              </label>

              <label>
                <input type="radio" name="level" />
                <span className="ml-2">Advanced</span>
              </label>

            </div>

          </div>

          {/* Duration */}

          <div className="mb-8">

            <label className="block font-semibold mb-2">
              Duration
            </label>

            <select className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500">

              <option>3 Months</option>

              <option>6 Months</option>

              <option>9 Months</option>

              <option>12 Months</option>

            </select>

          </div>

          {/* Button */}

          <button className="w-full rounded-xl bg-blue-600 py-4 text-white text-lg font-semibold hover:bg-blue-700 transition">

            Generate Roadmap

          </button>

        </div>

      </div>

    </section>
  );
}

export default RoadmapSection;