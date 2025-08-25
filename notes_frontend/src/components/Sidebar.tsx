"use client";

import React from "react";

type Props = {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (t: string | null) => void;
};

/**
 * PUBLIC_INTERFACE
 * Sidebar: Left navigation with tags list and filters.
 */
export default function Sidebar({ tags, selectedTag, onTagSelect }: Props) {
  return (
    <aside
      className="hidden lg:flex flex-col border-r"
      style={{ borderColor: "var(--color-border)" }}
      aria-label="Sidebar filters"
      role="complementary"
    >
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Filters</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            className={`button button-secondary ${selectedTag === null ? "ring-2" : ""}`}
            onClick={() => onTagSelect(null)}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              className={`button button-secondary ${selectedTag === t ? "ring-2" : ""}`}
              onClick={() => onTagSelect(t)}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4 text-xs text-gray-500">
        Light theme • Minimal UI
      </div>
    </aside>
  );
}
