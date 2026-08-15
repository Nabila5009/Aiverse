import { useState } from "react";

import {
  Sparkles,
  Send,
  Trash2,
  User,
  Bot,
} from "lucide-react";

import api from "../services/api";


function AIChat() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);


  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async () => {

    if (!message.trim() || loading) {
      return;
    }


    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message.trim(),
    };


    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);


    const currentMessage = message.trim();

    setMessage("");

    setLoading(true);


    try {

      // ========================================
      // SEND TO BACKEND
      // ========================================

      const response = await api.post(
        "/ai/chat",
        {
          message: currentMessage,
        }
      );


      // ========================================
      // AI RESPONSE
      // ========================================

      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        content: response.data.reply,
      };


      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);


    } catch (error) {

      console.error("AI Chat Error:", error);


      const errorMessage = {
        id: Date.now() + 1,
        role: "ai",
        content:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      };


      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);


    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      sendMessage();

    }

  };


  // ==========================================
  // SUGGESTION
  // ==========================================

  const useSuggestion = (text) => {

    setMessage(text);

  };


  // ==========================================
  // CLEAR CHAT
  // ==========================================

  const clearChat = () => {

    setMessages([]);

  };


  return (

    <div className="h-[calc(100vh-81px)] flex flex-col bg-gray-50">


      {/* ======================================
          HEADER
      ====================================== */}

      <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">


        <div className="flex items-center gap-4">

          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

            <Sparkles size={23} />

          </div>


          <div>

            <h1 className="text-xl font-bold text-gray-900">
              AI Chat
            </h1>

            <p className="text-sm text-gray-500">
              Ask anything and get intelligent answers.
            </p>

          </div>

        </div>


        {/* Clear Chat */}

        {messages.length > 0 && (

          <button
            onClick={clearChat}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
          >

            <Trash2 size={17} />

            Clear Chat

          </button>

        )}

      </header>



      {/* ======================================
          CHAT AREA
      ====================================== */}

      <main className="flex-1 overflow-y-auto px-6 py-8">


        {messages.length === 0 ? (

          /* ====================================
             EMPTY STATE
          ==================================== */

          <div className="h-full flex items-center justify-center">

            <div className="text-center max-w-lg">


              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">

                <Sparkles size={30} />

              </div>


              <h2 className="text-3xl font-bold text-gray-900">

                How can I help you?

              </h2>


              <p className="text-gray-500 mt-3">

                Ask questions, brainstorm ideas,
                write content, explain concepts,
                or get help with coding.

              </p>


              {/* Suggestions */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">


                <button
                  onClick={() =>
                    useSuggestion(
                      "Explain artificial intelligence in simple words"
                    )
                  }
                  className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition"
                >

                  <p className="font-medium text-gray-800">
                    Explain something
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Explain a complex topic simply.
                  </p>

                </button>


                <button
                  onClick={() =>
                    useSuggestion(
                      "Give me some project ideas"
                    )
                  }
                  className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition"
                >

                  <p className="font-medium text-gray-800">
                    Project ideas
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Get ideas for your next project.
                  </p>

                </button>


                <button
                  onClick={() =>
                    useSuggestion(
                      "Help me write a professional email"
                    )
                  }
                  className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition"
                >

                  <p className="font-medium text-gray-800">
                    Write something
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Create professional content.
                  </p>

                </button>


                <button
                  onClick={() =>
                    useSuggestion(
                      "Explain this JavaScript code"
                    )
                  }
                  className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition"
                >

                  <p className="font-medium text-gray-800">
                    Coding help
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Get help with programming.
                  </p>

                </button>


              </div>

            </div>

          </div>

        ) : (

          /* ====================================
             MESSAGES
          ==================================== */

          <div className="max-w-4xl mx-auto space-y-6">


            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`flex gap-4 ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >


                {/* AI ICON */}

                {msg.role === "ai" && (

                  <div className="w-9 h-9 shrink-0 rounded-lg bg-blue-600 text-white flex items-center justify-center">

                    <Bot size={19} />

                  </div>

                )}


                {/* MESSAGE */}

                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >

                  <p className="text-sm leading-6 whitespace-pre-wrap">
                    {msg.content}
                  </p>

                </div>


                {/* USER ICON */}

                {msg.role === "user" && (

                  <div className="w-9 h-9 shrink-0 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center">

                    <User size={19} />

                  </div>

                )}


              </div>

            ))}


            {/* ==================================
                LOADING
            ================================== */}

            {loading && (

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 shrink-0 rounded-lg bg-blue-600 text-white flex items-center justify-center">

                  <Bot size={19} />

                </div>


                <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">

                  <div className="flex items-center gap-1">

                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>

                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>

                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>

                  </div>

                </div>

              </div>

            )}


          </div>

        )}

      </main>



      {/* ======================================
          INPUT AREA
      ====================================== */}

      <div className="bg-white border-t border-gray-200 px-6 py-5">


        <div className="max-w-4xl mx-auto">


          <div className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition">


            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Message AIVerse AI..."
              rows="1"
              disabled={loading}
              className="flex-1 bg-transparent outline-none resize-none px-2 py-2 text-gray-800 placeholder-gray-400 disabled:opacity-50"
            />


            <button
              onClick={sendMessage}
              disabled={
                !message.trim() ||
                loading
              }
              className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >

              <Send size={19} />

            </button>


          </div>


          <p className="text-xs text-gray-400 text-center mt-3">

            Press Enter to send • Shift + Enter for new line

          </p>


        </div>


      </div>


    </div>

  );

}


export default AIChat;