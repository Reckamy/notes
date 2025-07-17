import React, { useState, useEffect } from "react";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

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
    setNotes([...notes, note.trim()]);
    setNote("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-black text-white p-6 flex flex-col items-center">
      <header className="mt-10 mb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-lg">
          ✨ My Notes
        </h1>
        <p className="text-gray-400 mt-2">Write down anything important 📝</p>
      </header>

      <main className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Type your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 p-3 rounded-xl text-black text-lg outline-none"
          />
          <button
            onClick={addNote}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-bold text-black shadow-md transition-all"
          >
            Add Note
          </button>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {notes.length === 0 ? (
            <p className="text-gray-400 text-center">No notes yet!</p>
          ) : (
            notes.map((n, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-xl shadow-inner"
              >
                <p className="text-lg break-words">{n}</p>
                <button
                  onClick={() => deleteNote(i)}
                  aria-label="Delete Note"
                  className="text-red-400 hover:text-red-600 ml-4"
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
