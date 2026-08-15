import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";

import Dashboard from "./pages/Dashboard";
import ArticleGenerator from "./pages/ArticleGenerator";
import DataAnalysis from "./pages/DataAnalysis";
import CareerRoadmap from "./pages/CareerRoadmap";
import ResumeReview from "./pages/ResumeReview";
import ImageGenerator from "./pages/ImageGenerator";
import BackgroundRemover from "./pages/BackgroundRemover";
import AIChat from "./pages/AIChat";
import CodeGenerator from "./pages/CodeGenerator";
import WebsiteBuilder from "./pages/WebsiteBuilder";
import Templates from "./pages/Templates";
import Translator from "./pages/Translator";

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">

        <div className="text-5xl mb-5">
          🚀
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="text-gray-500 mt-3">
          This AI tool is being prepared for AIVerse.
        </p>

      </div>

    </div>
  );
}

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/pricing" element={<Pricing />} />


        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          {/* 1 Dashboard */}
          <Route
            index
            element={<Dashboard />}
          />


          {/* 2 Content Writer */}
          <Route
            path="content-writer"
            element={<ArticleGenerator />}
          />

          {/* Existing article URL */}
          <Route
            path="article"
            element={<ArticleGenerator />}
          />


          {/* 5 Data Analysis */}
          <Route
            path="data-analysis"
            element={<DataAnalysis />}
          />


          {/* 11 Career Roadmap */}
          <Route
            path="career-roadmap"
            element={<CareerRoadmap />}
          />


          {/* 9 Resume Analyzer */}
          <Route
            path="resume-analyzer"
            element={<ResumeReview />}
          />

          {/* Existing URL */}
          <Route
            path="resume-review"
            element={<ResumeReview />}
          />


          {/* 7 Image Generator */}
          <Route
            path="image-generator"
            element={<ImageGenerator />}
          />


          {/* 10 Background Remover */}
          <Route
            path="background-remover"
            element={<BackgroundRemover />}
          />


        {/* 1 AI Chat */}
         <Route
         path="ai-chat"
         element={<AIChat />}
        />


        {/* 3 Code Generator */}
         <Route
         path="code-generator"
         element={<CodeGenerator />}
        />


        <Route
        path="website-builder"
        element={<WebsiteBuilder />}
        />


         <Route
         path="templates"
         element={<Templates />}
        />

        <Route
        path="translator"
        element={<Translator />}
       />
         

        </Route>

      </Routes>
    </>
  );
}

export default App;