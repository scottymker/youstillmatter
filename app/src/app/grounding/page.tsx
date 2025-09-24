"use client";
import { useState } from "react";
import { db } from "@/lib/db";

type Step = { label: string; count: number; items: string[] };
const INITIAL: Step[] = [
  { label: "See",   count: 5, items: [] },
  { label: "Touch", count: 4, items: [] },
  { label: "Hear",  count: 3, items: [] },
  { label: "Smell", count: 2, items: [] },
  { label: "Taste", count: 1, items: [] }
];

export default function Grounding() {
  const [steps, setSteps] = useState<Step[]>(INITIAL);
  const [i, setI] = useState(0);
  const step = steps[i];

  const add = async (text: string) => {
    const copy = [...steps];
    copy[i].items = [...copy[i].items, text].slice(0, copy[i].count);
    setSteps(copy);
    await db.grounding.add({ step: step.label, text, createdAt: Date.now() });
  };

  const next = () => setI((v) => Math.min(v + 1, steps.length - 1));
  const prev = () => setI((v) => Math.max(v - 1, 0));

  return (
    <section className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-2">5-4-3-2-1 Grounding</h1>
      <p className="opacity-80 mb-4">Notice {step.count} things you can <b>{step.label.toLowerCase()}</b>.</p>

      <form onSubmit={(e:any)=>{e.preventDefault(); const t=e.target.note.value.trim(); if(t){ add(t); e.target.reset();}}}>
        <input name="note" placeholder={`Add something you can ${step.label.toLowerCase()}...`} className="w-full border rounded-xl2 p-3" />
      </form>

      <ul className="mt-4 space-y-2">
        {step.items.map((it, idx) => (<li key={idx} className="border rounded-xl2 p-3">{it}</li>))}
      </ul>

      <div className="flex gap-2 mt-6">
        <button onClick={prev} className="px-4 py-2 border rounded-xl2" disabled={i===0}>Back</button>
        <button onClick={next} className="px-4 py-2 border rounded-xl2" disabled={i===steps.length-1 || step.items.length<step.count}>Next</button>
      </div>
    </section>
  );
}
