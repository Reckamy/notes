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
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white flex flex-col items-center p-6">
      <header className="text-center mt-10 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-red-500 drop-shadow-lg">AI Translator</h1>
        <p className="text-lg max-w-xl mx-auto text-gray-300">
          Translate any text into multiple languages using Microsoft AI.
        </p>
      </header>

      <main className="w-full max-w-3xl bg-black bg-opacity-70 rounded-2xl p-8 shadow-2xl border border-red-600">
        <textarea
          rows="4"
          className="w-full p-4 rounded-xl text-black text-lg"
          placeholder="Enter text here (auto-detect language)"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
          <select
            className="p-3 rounded-xl text-black text-lg w-full md:w-auto border-2 border-red-500"
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
            className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-3 rounded-xl font-semibold w-full md:w-auto shadow-lg"
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>

        <div className="mt-6 bg-gray-900 p-4 rounded-xl min-h-[80px] border-t-2 border-red-500">
          <h2 className="text-lg font-bold mb-2 text-red-400">🔁 Translated Output:</h2>
          <p className="text-gray-100 whitespace-pre-line">{outputText}</p>
        </div>
      </main>

      <footer className="mt-auto py-6 text-gray-500 text-sm">
        © 2025 RedEdge AI Translator | Powered by Microsoft Cognitive Services
      </footer>
    </div>
  );
}

export default App;
