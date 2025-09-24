"use client";
import { useState } from "react";
import { db } from "@/lib/db";

export default function CheckIn() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");

  const save = async () => {
    await db.moods.add({ value: mood, note: note.trim() || undefined, createdAt: Date.now() });
    setNote("");
    alert("Saved on your device.");
  };

  return (
    <section className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Daily Check-in</h1>
      <label className="block">Mood: <b>{mood}</b>/10</label>
      <input type="range" min="1" max="10" value={mood} onChange={(e)=>setMood(Number(e.target.value))} className="w-full" />
      <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Optional note (stays on device)" className="w-full border rounded-xl2 p-3 min-h-[90px]" />
      <button onClick={save} className="px-4 py-2 border rounded-xl2">Save</button>
      <p className="text-xs text-mute">Data is stored locally (IndexedDB). You can clear your browser data anytime to remove it.</p>
    </section>
  );
}
