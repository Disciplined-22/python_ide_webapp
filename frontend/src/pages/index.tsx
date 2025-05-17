"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const runPythonCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/runPython", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.output || data.error);
    } catch (err) {
      console.error("Error:", err);
      setOutput("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with fun styling */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
            Python Playground
          </h1>
          <p className="text-lg text-gray-600">
            Write your Python code and see it run instantly! 🚀
          </p>
        </header>

        {/* Code editor section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-700">
              Your Python Code
            </h2>
            <button
              onClick={runPythonCode}
              disabled={loading}
              className={`px-6 py-2 rounded-full font-medium text-white shadow-md transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running...
                </span>
              ) : (
                "▶ Run Code"
              )}
            </button>
          </div>
          
          <textarea
            rows={12}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="# Welcome to Python Playground!\n# Try writing: print('Hello World!')\n# Then click the Run button above"
            className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 font-mono text-gray-700 resize-none transition-all"
          />
        </div>

        {/* Output section */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Output</h2>
          <div className="relative">
            <pre className={`w-full p-4 bg-gray-800 rounded-lg text-gray-100 font-mono text-sm overflow-x-auto min-h-32 ${!output && "text-gray-500"}`}>
              {output || "Your output will appear here..."}
            </pre>
            {output && (
              <button 
                onClick={() => setOutput("")}
                className="absolute top-2 right-2 p-1 bg-gray-700 rounded-md text-xs text-gray-300 hover:text-white"
                title="Clear output"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tips for beginners */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg text-indigo-600 mb-2">💡 Beginner Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Start with simple commands like <code className="bg-gray-100 px-1 rounded">print("Hello World!")</code></li>
            <li>• Python uses indentation (spaces) to organize code</li>
            <li>• Errors are learning opportunities - read them carefully!</li>
            <li>• Try creating variables with <code className="bg-gray-100 px-1 rounded">x = 5</code> and doing math</li>
          </ul>
        </div>
      </div>
    </div>
  );
}