import express from "express";
import fs from "fs";
import path from "path";
import { createEvent } from "../google/calendar.js";

const router = express.Router();
const filePath = path.resolve("data/notes.json");

const readNotes = () =>
  JSON.parse(fs.readFileSync(filePath, "utf-8"));

const writeNotes = notes =>
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

router.get("/", (req, res) => {
  res.json(readNotes());
});

router.post("/", async (req, res) => {
  const notes = readNotes();

  const note = {
    id: Date.now(),
    ...req.body,
    calendarEventId: null
  };

  try {
  const eventId = await createEvent(note);
  note.calendarEventId = eventId;
} catch (err) {
  console.error("❌ Google Calendar FULL ERROR:");
  console.error(err.response?.data || err);
  return res.status(500).json({
    error: "Failed to create Google Calendar event"
  });
}

  notes.push(note);
  writeNotes(notes);

  res.json(note);
});

router.put("/:id", async (req, res) => {
  const notes = readNotes();
  const index = notes.findIndex(n => n.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes[index] = { ...notes[index], ...req.body };
  writeNotes(notes);

  res.json(notes[index]);
});

export default router;
