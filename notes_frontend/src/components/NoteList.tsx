"use client";

import React from "react";
import type { Note } from "../lib/types";

type Props = {
  notes: Note[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * NoteList: Displays list of notes with titles and timestamps.
 */
export default function NoteList({ notes, activeId, onSelect }: Props) {
  return (
    <div className="border-r h-full overflow-y-auto" style={{ borderColor: "var(--color-border)" }}>
      {notes.length === 0 ? (
        <div className="p-6 text-gray-500">No notes found.</div>
      ) : (
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => onSelect(n.id)}
                className={`w-full text-left p-4 border-b hover:bg-gray-50 ${
                  activeId === n.id ? "bg-gray-50" : ""
                }`}
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="font-medium" aria-label={`Note title ${n.title || "Untitled"}`}>{n.title || "Untitled"}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(n.updatedAt).toLocaleString()}
                </div>
                {n.tags && n.tags.length > 0 ? (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {n.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full" style={{ background: "#eef2ff", color: "#3730a3" }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
