function AITools() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center">
        AI Tools
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg cursor-pointer">
          <h2 className="text-xl font-bold">
            ✍️ Content Generator
          </h2>

          <p className="text-gray-500 mt-3">
            Generate blogs, captions and articles.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg cursor-pointer">
          <h2 className="text-xl font-bold">
             Data Analyzer
          </h2>

          <p className="text-gray-500 mt-3">
            Upload CSV and get insights.
          </p>
        </div>

      </div>

    </div>
  );
}

export default AITools;