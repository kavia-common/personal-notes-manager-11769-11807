"use client";

import React from "react";
import { useAuth } from "../lib/auth-context";

/**
 * PUBLIC_INTERFACE
 * Header: App header with search input and user controls.
 */
export default function Header({
  search,
  onSearchChange,
  onNewNote,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  onNewNote: () => void;
}) {
  const { user, logout } = useAuth();
  return (
    <header className="w-full border-b" style={{ borderColor: "var(--color-border)" }}>
      <div className="px-4 py-3 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl" style={{ background: "var(--color-primary)" }} />
          <span className="font-medium text-lg">Notes</span>
        </div>
        <div className="flex-1 max-w-xl mx-4">
          <input
            className="input"
            placeholder="Search notes by title or content..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search notes"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="button button-accent" onClick={onNewNote} aria-label="New note">
            + New Note
          </button>
          {user ? (
            <>
              <div className="hidden sm:block text-sm text-gray-600">{user.email}</div>
              <button className="button button-secondary" onClick={logout} aria-label="Sign out">
                Sign out
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
