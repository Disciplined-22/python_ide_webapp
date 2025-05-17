import '../styles/globals.css';

export default function about() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind CSS works!</h1>
        <p className="text-gray-700">If you see this styled box, Tailwind is properly configured.</p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
          Click Me
        </button>
      </div>
    </div>
  )
}
