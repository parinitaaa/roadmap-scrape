import React, { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/scrape", { topic });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        W3Schools Roadmap Scraper
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., javascript)"
          className="px-3 py-2 border border-gray-400 rounded w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition"
        >
          Fetch Roadmap
        </button>
      </div>

      {loading && <p className="text-gray-700">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="w-full max-w-2xl mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{result.topic}</h2>
          {result.roadmap.map((section, idx) => (
            <div
              key={idx}
              className="mb-4 p-4 border border-gray-300 rounded hover:border-green-400 transition"
            >
              <h3 className="font-semibold text-gray-700 mb-2">{section.section}</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
