import React, { useState, useEffect } from "react";

function App() {
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  const [notes, setNotes] = useState([]);
  const [filterTag, setFilterTag] = useState("");

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Update localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() === "") return;
    const newNote = { text: note.trim(), tag: tag.trim() || "General" };
    setNotes([...notes, newNote]);
    setNote("");
    setTag("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const uniqueTags = [...new Set(notes.map((n) => n.tag))];

  const filteredNotes =
    filterTag === "" ? notes : notes.filter((n) => n.tag === filterTag);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple via-gray-900 to-black text-white p-6 flex flex-col items-center">
      <header className="mt-10 mb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-lg">
          ✨ My Notes
        </h1>
        <p className="text-gray-400 mt-2">Write down anything important 📝</p>
      </header>

      <main className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Type your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 p-3 rounded-xl text-black text-lg outline-none"
          />
          <input
            type="text"
            placeholder="Tag (e.g., Work, Ideas)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full md:w-48 p-3 rounded-xl text-black text-lg outline-none"
          />
          <button
            onClick={addNote}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-bold text-black shadow-md transition-all"
          >
            Add Note
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterTag("")}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              filterTag === ""
                ? "bg-yellow-500 text-black"
                : "bg-gray-600 hover:bg-gray-700 text-white"
            }`}
          >
            Show All
          </button>
          {uniqueTags.map((t, i) => (
            <button
              key={i}
              onClick={() => setFilterTag(t)}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                filterTag === t
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {filteredNotes.length === 0 ? (
            <p className="text-gray-400 text-center">No notes found!</p>
          ) : (
            filteredNotes.map((n, i) => (
              <div
                key={i}
                className="flex justify-between items-start bg-gray-700 p-4 rounded-xl shadow-inner"
              >
                <div className="flex-1">
                  <p className="text-lg break-words">{n.text}</p>
                  <p className="text-sm text-yellow-400 mt-1">#{n.tag}</p>
                </div>
                <button
                  onClick={() => deleteNote(notes.indexOf(n))}
                  aria-label="Delete Note"
                  className="text-red-400 hover:text-red-600 ml-4 mt-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="mt-12 text-sm text-gray-500">
        © 2025 StickyNote | Built with ❤️ and Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
