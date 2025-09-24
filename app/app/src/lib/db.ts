import Dexie, { Table } from "dexie";
export type Mood = { id?: number; value: number; note?: string; createdAt: number };
export type GroundingEntry = { id?: number; step: string; text: string; createdAt: number };

class YSMDB extends Dexie {
  moods!: Table<Mood, number>;
  grounding!: Table<GroundingEntry, number>;
  constructor() {
    super("ysm_db");
    this.version(1).stores({
      moods: "++id, createdAt",
      grounding: "++id, step, createdAt"
    });
  }
}
export const db = new YSMDB();
