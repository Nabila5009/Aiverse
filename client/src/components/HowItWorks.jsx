function HowItWorks() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <p className="text-gray-600 text-center mt-4">
          Get AI-powered results in just three simple steps.
        </p>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto text-3xl">
              🧠
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Choose a Tool
            </h3>

            <p className="mt-4 text-gray-600">
              Select any AI tool from our growing collection.
            </p>

          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto text-3xl">
              ✍️
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Enter Your Prompt
            </h3>

            <p className="mt-4 text-gray-600">
              Describe exactly what you want AI to generate.
            </p>

          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto text-3xl">
              ⚡
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Get Instant Results
            </h3>

            <p className="mt-4 text-gray-600">
              Receive fast, accurate AI-generated content in seconds.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;