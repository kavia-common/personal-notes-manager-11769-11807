"use client";

import React from "react";

/**
 * PUBLIC_INTERFACE
 * EmptyState: Placeholder when there is nothing selected.
 */
export default function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center text-center p-8">
      <div>
        <div className="mx-auto mb-4 h-12 w-12 rounded-2xl" style={{ background: "var(--color-secondary)" }} />
        <h3 className="text-lg font-medium mb-1">No note selected</h3>
        <p className="text-gray-500">Choose a note from the list or create a new one.</p>
      </div>
    </div>
  );
}
