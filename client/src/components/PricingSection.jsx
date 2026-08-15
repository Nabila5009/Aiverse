function PricingSection() {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center">
          Choose Your Plan
        </h2>

        <p className="text-gray-600 text-center mt-4">
          Start free and scale up as you grow.
        </p>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Free Plan */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <h3 className="text-2xl font-bold">
              Free
            </h3>

            <p className="mt-6 text-5xl font-bold">
              ₹0
            </p>

            <p className="mt-2 text-gray-500">
              Forever Free
            </p>

            <ul className="mt-8 space-y-4 text-gray-700">

              <li>✔ Article Generator</li>

              <li>✔ Image Generator</li>

              <li>✔ Resume Reviewer</li>

              <li>✔ Email Writer</li>

            </ul>

            <button className="mt-10 w-full rounded-xl bg-gray-900 py-3 text-white hover:bg-black transition">
              Get Started
            </button>

          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl border-2 border-blue-600 bg-white p-8 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
              Most Popular
            </span>

            <h3 className="mt-4 text-2xl font-bold">
              Pro
            </h3>

            <p className="mt-6 text-5xl font-bold">
              ₹499
            </p>

            <p className="mt-2 text-gray-500">
              Per Month
            </p>

            <ul className="mt-8 space-y-4 text-gray-700">

              <li>✔ Unlimited AI Tools</li>

              <li>✔ Data Analysis</li>

              <li>✔ Code Generator</li>

              <li>✔ Future AI Tools</li>

              <li>✔ Priority Support</li>

            </ul>

            <button className="mt-10 w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
              Subscribe Now
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default PricingSection;