function FAQ() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-600 text-center mt-4">
          Everything you need to know about our AI platform.
        </p>

        {/* FAQ Items */}
        <div className="mt-16 space-y-6">

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">
              Is there a free plan available?
            </h3>

            <p className="text-gray-600 mt-3">
              Yes. You can start with our Free Plan and upgrade anytime.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">
              Which AI tools are included?
            </h3>

            <p className="text-gray-600 mt-3">
              You can generate articles, images, code, emails, analyze data,
              review resumes and much more.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">
              Can I upgrade later?
            </h3>

            <p className="text-gray-600 mt-3">
              Absolutely. You can switch to the Pro plan whenever you need more
              features.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default FAQ;