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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Online Python Executor (TypeScript)</h1>

      <textarea
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
        className="w-full max-w-lg p-2 mb-4 bg-white border border-gray-300 rounded-md"
      />

      <button 
        onClick={runPythonCode} 
        className={`px-4 py-2 mb-4 rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={loading}
      >
        {loading ? "Running..." : "Run Python Code"}
      </button>

      <h3 className="text-lg font-semibold mb-2">Output:</h3>
      <pre className="w-full max-w-lg p-2 bg-gray-200 rounded-md text-sm">
        {output}
      </pre>
    </div>
  );
}
