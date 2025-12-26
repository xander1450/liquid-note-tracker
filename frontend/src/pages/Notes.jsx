import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

export default function Notes({ user }) {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    fetch("https://liquid-note-tracker-api.onrender.com/notes")
      .then(res => res.json())
      .then(setNotes);
  }, []);

  const saveNote = async () => {
    if (!title || !start || !end) return alert("Fill all fields");

    const res = await fetch("https://liquid-note-tracker-api.onrender.com/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        title,
        content,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString()
      })
    });

    const saved = await res.json();
    setNotes(prev => [...prev, saved]);

    setTitle("");
    setContent("");
    setStart("");
    setEnd("");
  };

  const updateNote = async () => {
    const res = await fetch(
      `https://liquid-note-tracker-api.onrender.com/notes/${activeNote.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeNote)
      }
    );

    const updated = await res.json();
    setNotes(n =>
      n.map(note => (note.id === updated.id ? updated : note))
    );
    setActiveNote(null);
  };

  return (
    <>
      {/* LOGOUT */}
      <button
        className="secondary logout-btn"
        onClick={() => signOut(auth)}
      >
        Logout
      </button>

      {/* MAIN NOTES CARD */}
      <div className="glass-card notes-container">
        <h2>My Notes</h2>

        <input
          placeholder="Note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <div style={{ height: 10 }} />

        <textarea
          placeholder="Note details"
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{
            width: "100%",
            minHeight: 80,
            borderRadius: 10,
            padding: 12,
            background: "rgba(255,255,255,0.15)",
            color: "white",
            border: "none"
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />
          <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
        </div>

        <button className="primary" style={{ marginTop: 14 }} onClick={saveNote}>
          Save & Add to Calendar
        </button>

        {/* SCROLLABLE NOTES LIST */}
        <div className="notes-list">
          {notes.map(n => (
            <div
              key={n.id}
              className="note-item"
              onClick={() => setActiveNote({ ...n })}
            >
              <strong>{n.title}</strong>
              <div style={{ opacity: 0.7, fontSize: 13 }}>
                {n.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL SCREEN EDIT MODAL */}
      {activeNote && (
        <div className="fullscreen-modal">
          <div className="modal-card">
            <h2>Edit Note</h2>

            <input
              value={activeNote.title}
              onChange={e =>
                setActiveNote({ ...activeNote, title: e.target.value })
              }
            />

            <div style={{ height: 10 }} />

            <textarea
              value={activeNote.content}
              onChange={e =>
                setActiveNote({ ...activeNote, content: e.target.value })
              }
              style={{
                width: "100%",
                minHeight: 120,
                borderRadius: 10,
                padding: 12,
                background: "rgba(255,255,255,0.15)",
                color: "white",
                border: "none"
              }}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <input
                type="datetime-local"
                value={activeNote.start.slice(0,16)}
                onChange={e =>
                  setActiveNote({
                    ...activeNote,
                    start: new Date(e.target.value).toISOString()
                  })
                }
              />
              <input
                type="datetime-local"
                value={activeNote.end.slice(0,16)}
                onChange={e =>
                  setActiveNote({
                    ...activeNote,
                    end: new Date(e.target.value).toISOString()
                  })
                }
              />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button className="primary" onClick={updateNote}>
                Save Changes
              </button>
              <button
                className="secondary"
                onClick={() => setActiveNote(null)}
              >
                Cancel
              </button>

              <button
  className="secondary"
  style={{ background: "#ff6b6b", color: "white" }}
  onClick={async () => {
    try {
      console.log("Deleting note:", activeNote);

      const res = await fetch(
        `https://liquid-note-tracker-api.onrender.com/notes/${activeNote.id}`,
        { method: "DELETE" }
      );

      const text = await res.text();
      console.log("Delete response status:", res.status);
      console.log("Delete response body:", text);

      if (!res.ok) {
        throw new Error(text);
      }

      setNotes(prev =>
        prev.filter(note => note.id !== activeNote.id)
      );
      setActiveNote(null);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Failed to delete note");
    }
  }}
>
  Delete
</button>


              
            </div>
          </div>
        </div>
      )}
    </>
  );
}
