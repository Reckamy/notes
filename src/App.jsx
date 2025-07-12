import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [toLang, setToLang] = useState("hi"); // Default to Hindi
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "fr", label: "French" },
    { code: "es", label: "Spanish" },
    { code: "de", label: "German" },
    { code: "zh-Hans", label: "Chinese (Simplified)" },
    { code: "ar", label: "Arabic" },
    { code: "ru", label: "Russian" },
    { code: "ja", label: "Japanese" },
    { code: "ko", label: "Korean" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" }
  ];

  const translateText = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${toLang}`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": "GCi5MAOg2TCUBrj2tDH4HViJrksmKiflgp9ADWpxyU8VxKuHILsuJQQJ99BFAC4f1cMXJ3w3AAAbACOGPE6P",
            "Ocp-Apim-Subscription-Region": "westus",
            "Content-Type": "application/json"
          },
          body: JSON.stringify([{ Text: inputText }])
        }
      );

      const result = await response.json();
      setOutputText(result[0]?.translations[0]?.text || "Translation failed.");
    } catch (error) {
      console.error("Translation Error:", error);
      setOutputText("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white flex flex-col items-center p-6">
      <header className="text-center mt-10 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">🌍 AI Translator</h1>
        <p className="text-lg max-w-xl mx-auto text-gray-300">
          Translate any text into multiple languages using Microsoft AI.
        </p>
      </header>

      <main className="w-full max-w-3xl bg-black bg-opacity-60 rounded-2xl p-8 shadow-2xl">
        <textarea
          rows="4"
          className="w-full p-4 rounded-xl text-black text-lg"
          placeholder="Enter text here (auto-detect language)"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
          <select
            className="p-3 rounded-xl text-black text-lg w-full md:w-auto"
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={translateText}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white px-6 py-3 rounded-xl font-semibold w-full md:w-auto"
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>

        <div className="mt-6 bg-gray-800 p-4 rounded-xl min-h-[80px]">
          <h2 className="text-lg font-bold mb-2">🔁 Translated Output:</h2>
          <p className="text-gray-100">{outputText}</p>
        </div>
      </main>

      <footer className="mt-auto py-6 text-gray-400 text-sm">
        © 2025 AI Translator | Powered by Microsoft Cognitive Services
      </footer>
    </div>
  );
}

export default App;
