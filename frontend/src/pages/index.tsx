"use client";

import { useState, useRef, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const editorRef = useRef(null);

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

  // Default Python code example
  useEffect(() => {
    setCode(`# Welcome to Python Playground!
# Try writing: print('Hello World!')
# Then click the Run button above

def greet(name):
    return f"Hello, {name}!"

print(greet("Python Learner"))`);
  }, []);

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
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
              >
                {isDarkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
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
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Running...
                  </span>
                ) : (
                  "▶ Run Code"
                )}
              </button>
            </div>
          </div>

         <div className="rounded-xl overflow-hidden border-2 border-indigo-200/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2 border-b border-indigo-100 flex items-center">
    <div className="flex space-x-2 mr-4">
      <div className="w-3 h-3 rounded-full bg-red-400"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
      <div className="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
    <div className="text-xs font-mono text-indigo-500/80">
      python_playground.py
    </div>
  </div>
  
  <CodeMirror
    ref={editorRef}
    value={code}
    onChange={(value: string) => setCode(value)}
    extensions={[python()]}
    theme={isDarkMode ? githubDark : githubLight}
    height="400px"
    className="!text-sm sm:!text-base"
    basicSetup={{
      lineNumbers: true,
      highlightActiveLineGutter: true,
      highlightActiveLine: true,
      foldGutter: true,
      autocompletion: true,
      indentOnInput: true,
      syntaxHighlighting: true,
      bracketMatching: true,
      closeBrackets: true,
    }}
  />
  
  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2 border-t border-indigo-100 flex justify-between items-center">
    <div className="text-xs font-mono text-indigo-500/60">
      {code.length} characters | {code.split('\n').length} lines
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded-md">
        Python 3
      </span>
      {isDarkMode ? (
        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-200 rounded-md">
          Dark Mode
        </span>
      ) : (
        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
          Light Mode
        </span>
      )}
    </div>
  </div>
</div>
        </div>

        {/* Output section */}
       <div className="mt-6">
  <div className="flex items-center justify-between mb-2">
    <h2 className="text-lg font-mono font-semibold text-black-300 flex items-center">
      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
      TERMINAL
    </h2>
    {output && (
      <button
        onClick={() => setOutput("")}
        className="text-xs text-gray-400 hover:text-white transition-colors"
        title="Clear terminal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    )}
  </div>
  <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
    <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <pre
      className={`w-full p-4 font-mono text-sm overflow-x-auto min-h-32 ${
        output 
          ? "text-green-400" 
          : "text-gray-500"
      }`}
      style={{
        background: 'rgba(17, 24, 39, 0.8)',
        backdropFilter: 'blur(4px)',
        lineHeight: '1.5'
      }}
    >
      {output ? (
        <>
          <span className="text-purple-400">$</span> {output.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < output.split('\n').length - 1 && <br />}
            </span>
          ))}
        </>
      ) : (
        "> Ready for output..."
      )}
    </pre>
  </div>
</div>

        {/* Tips for beginners */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg text-indigo-600 mb-2">
            💡 Beginner Tips
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • Start with simple commands like{" "}
              <code className="bg-gray-100 px-1 rounded">
                print("Hello World!")
              </code>
            </li>
            <li>• Python uses indentation (spaces) to organize code</li>
            <li>• Errors are learning opportunities - read them carefully!</li>
            <li>
              • Try creating variables with{" "}
              <code className="bg-gray-100 px-1 rounded">x = 5</code> and doing
              math
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}