import { useState } from "react";

import api from "../services/api";

import {
  Upload,
  FileSpreadsheet,
  Sparkles,
  BarChart3,
  TrendingUp,
  X,
  Lightbulb,
  Target,
  Loader2,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


function DataAnalysis() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [dashboard, setDashboard] =
    useState(null);

  const [dragging, setDragging] =
    useState(false);


  // ==========================================
  // FILE HANDLING
  // ==========================================

  const handleFile = (selectedFile) => {

    if (!selectedFile) return;

    const fileName =
      selectedFile.name.toLowerCase();

    const isValid =
      fileName.endsWith(".csv") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx");

    if (!isValid) {

      setError(
        "Please upload a CSV or Excel file."
      );

      return;
    }

    setFile(selectedFile);

    setError("");

    setDashboard(null);
  };


  const handleDrop = (e) => {

    e.preventDefault();

    setDragging(false);

    const droppedFile =
      e.dataTransfer.files[0];

    handleFile(droppedFile);
  };


  const removeFile = () => {

    setFile(null);

    setDashboard(null);

    setError("");
  };


  // ==========================================
  // ANALYZE DATA
  // ==========================================

  const analyzeData = async () => {

    if (!file) {

      setError(
        "Please upload a file first."
      );

      return;
    }

    try {

      setLoading(true);

      setError("");

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await api.post(
          "/data-analysis/analyze",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      if (
        !response.data.success
      ) {

        throw new Error(
          response.data.message ||
          "Analysis failed"
        );
      }

      setDashboard(
        response.data
      );

    } catch (error) {

      console.error(
        "Data Analysis Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to analyze your data."
      );

    } finally {

      setLoading(false);
    }
  };


  // ==========================================
  // CHART RENDERER
  // ==========================================

  const renderChart = (
    chart,
    index
  ) => {

    if (!chart?.data?.length) {
      return null;
    }


    if (chart.type === "line") {

      return (

        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >

          <h3 className="text-lg font-bold text-gray-900 mb-6">
            {chart.title}
          </h3>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={chart.data}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey={chart.xKey}
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey={chart.yKey}
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>
      );
    }


    if (chart.type === "pie") {

      return (

        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >

          <h3 className="text-lg font-bold text-gray-900 mb-6">
            {chart.title}
          </h3>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chart.data}
                  dataKey={chart.yKey}
                  nameKey={chart.xKey}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >

                  {chart.data.map(
                    (_, i) => (
                      <Cell
                        key={i}
                        fill={[
                          "#2563eb",
                          "#10b981",
                          "#8b5cf6",
                          "#f59e0b",
                          "#ef4444",
                          "#06b6d4",
                        ][
                          i % 6
                        ]}
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>
      );
    }


    // DEFAULT = BAR

    return (

      <div
        key={index}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >

        <h3 className="text-lg font-bold text-gray-900 mb-6">
          {chart.title}
        </h3>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={chart.data}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey={chart.xKey}
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey={chart.yKey}
                fill="#2563eb"
                radius={[
                  6,
                  6,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
    );
  };


  // ==========================================
  // NORMAL UPLOAD SCREEN
  // ==========================================

  if (!dashboard) {

    return (

      <div>

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">

              <BarChart3 size={25} />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                Data Analysis
              </h1>

              <p className="text-gray-500 mt-1">
                Turn your business data into meaningful insights.
              </p>

            </div>

          </div>

        </div>


        {/* UPLOAD CARD */}

        <div className="max-w-5xl">

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

            <h2 className="text-xl font-bold text-gray-900">
              Upload your business data
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Upload a CSV or Excel file and let AI discover important business insights.
            </p>


            {!file ? (

              <label
                htmlFor="data-file"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() =>
                  setDragging(false)
                }
                onDrop={handleDrop}
                className={`block cursor-pointer border-2 border-dashed rounded-2xl p-12 mt-7 text-center transition ${
                  dragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >

                <input
                  id="data-file"
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  className="hidden"
                  onChange={(e) =>
                    handleFile(
                      e.target.files[0]
                    )
                  }
                />

                <Upload
                  size={30}
                  className="mx-auto text-blue-600"
                />

                <h3 className="text-lg font-semibold mt-5">
                  Upload your data
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Drag & drop or browse
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  CSV, XLS, XLSX
                </p>

              </label>

            ) : (

              <div className="border border-gray-200 rounded-2xl p-5 mt-7">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">

                      <FileSpreadsheet
                        size={24}
                      />

                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {file.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={removeFile}
                    className="w-9 h-9 flex items-center justify-center hover:bg-red-50 hover:text-red-500 rounded-lg"
                  >

                    <X size={18} />

                  </button>

                </div>

              </div>
            )}


            {/* ERROR */}

            {error && (

              <div className="mt-5 bg-red-50 border border-red-100 text-red-600 rounded-xl p-4">
                {error}
              </div>

            )}


            {/* BUTTON */}

            <button
              onClick={analyzeData}
              disabled={
                !file || loading
              }
              className={`mt-7 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold ${
                file && !loading
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >

              {loading ? (

                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Analyzing your data...

                </>

              ) : (

                <>
                  <Sparkles size={20} />

                  Analyze with AI

                </>
              )}

            </button>

          </div>

        </div>

      </div>
    );
  }


  // ==========================================
  // INTERACTIVE DASHBOARD
  // ==========================================

  const analysis =
    dashboard.analysis;


  return (

    <div className="space-y-8 pb-10">

      {/* HEADER */}

      <div>

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">

                <BarChart3
                  size={25}
                />

              </div>

              <div>

                <h1 className="text-3xl font-bold text-gray-900">
                  {analysis.title}
                </h1>

                <p className="text-gray-500 mt-1">
                  {dashboard.fileName} • {dashboard.rowCount} rows
                </p>

              </div>

            </div>

          </div>


          <button
            onClick={() => {
              setDashboard(null);
              setFile(null);
            }}
            className="px-4 py-2 border rounded-xl hover:bg-gray-50"
          >
            Analyze another file
          </button>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        <div className="flex items-center gap-2">

          <Sparkles
            size={20}
            className="text-purple-600"
          />

          <h2 className="text-xl font-bold">
            AI Executive Summary
          </h2>

        </div>

        <p className="text-gray-600 mt-4 leading-7">
          {analysis.summary}
        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {analysis.kpis.map(
          (kpi, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >

              <div className="flex items-center justify-between">

                <p className="text-sm text-gray-500">
                  {kpi.label}
                </p>

                <TrendingUp
                  size={20}
                  className="text-green-500"
                />

              </div>

              <h3 className="text-3xl font-bold text-gray-900 mt-3">
                {kpi.value}
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                {kpi.description}
              </p>

            </div>

          )
        )}

      </div>


      {/* CHARTS */}

      <div>

        <div className="flex items-center gap-2 mb-5">

          <BarChart3
            size={22}
            className="text-blue-600"
          />

          <h2 className="text-xl font-bold">
            Business Performance
          </h2>

        </div>


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {analysis.charts.map(
            renderChart
          )}

        </div>

      </div>


      {/* INSIGHTS */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        <div className="flex items-center gap-2">

          <Lightbulb
            size={22}
            className="text-yellow-500"
          />

          <h2 className="text-xl font-bold">
            AI Business Insights
          </h2>

        </div>


        <div className="space-y-4 mt-5">

          {analysis.insights.map(
            (insight, index) => (

              <div
                key={index}
                className="p-4 bg-blue-50 rounded-xl"
              >

                <p className="text-gray-700">
                  {insight}
                </p>

              </div>

            )
          )}

        </div>

      </div>


      {/* RECOMMENDATIONS */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        <div className="flex items-center gap-2">

          <Target
            size={22}
            className="text-purple-600"
          />

          <h2 className="text-xl font-bold">
            Recommended Actions
          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

          {analysis.recommendations.map(
            (recommendation, index) => (

              <div
                key={index}
                className="border border-gray-100 rounded-xl p-5"
              >

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">

                    <Target
                      size={17}
                    />

                  </div>

                  <p className="text-gray-700">
                    {recommendation}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}


export default DataAnalysis;