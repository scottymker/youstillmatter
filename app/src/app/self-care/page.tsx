"use client";
import { useEffect, useMemo, useState } from "react";

type Item = { id: string; title: string; hint?: string; done?: boolean; };

const DEFAULTS: Item[] = [
  { id: "water",     title: "Sip water",           hint: "Even a few sips count." },
  { id: "breath",    title: "3 slow breaths",      hint: "In 4 • hold 4 • out 6." },
  { id: "move",      title: "Stand or stretch",    hint: "10–30 seconds." },
  { id: "light",     title: "Open blinds / step outside", hint: "Look at the sky." },
  { id: "text",      title: "Text a friend",       hint: "“Thinking of you” works." },
  { id: "snack",     title: "Small snack",         hint: "Something you enjoy." },
];

const KEY = "ysm_selfcare_v1";

export default function SelfCare() {
  const [items, setItems] = useState<Item[]>(DEFAULTS);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const remaining = useMemo(() => items.filter(i => !i.done).length, [items]);

  const toggle = (id: string) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));

  const reset = () => setItems(prev => prev.map(i => ({ ...i, done: false })));

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Self-Care Menu</h1>
      <p className="text-mute">Pick one or two. Little things count. <span className="ml-1">({items.length - remaining} done today)</span></p>

      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map(it => (
          <li key={it.id}>
            <button
              onClick={() => toggle(it.id)}
              className={`w-full text-left card ${it.done ? "border-brand-300 bg-brand-50" : ""}`}
              aria-pressed={it.done}
            >
              <div className="flex items-start gap-3">
                <span className={`inline-flex h-5 w-5 shrink-0 rounded-full border mt-0.5 ${it.done ? "bg-brand-500 border-brand-500" : "border-gray-300"}`} />
                <div>
                  <div className="font-medium">{it.title}</div>
                  {it.hint && <div className="text-sm text-mute">{it.hint}</div>}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button onClick={reset} className="px-4 py-2 border rounded-xl2">Reset</button>
        <a href="/grounding" className="px-4 py-2 border rounded-xl2">Try 5-4-3-2-1</a>
      </div>
    </section>
  );
}
