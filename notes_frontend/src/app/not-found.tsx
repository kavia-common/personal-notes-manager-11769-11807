"use client";

import React from "react";
import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * NotFound: Custom 404 page with links back to home and notes.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="card p-6 w-full max-w-lg text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-2xl" style={{ background: "var(--color-primary)" }} />
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="text-gray-600 mb-4">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Link className="button button-secondary" href="/">Go Home</Link>
          <Link className="button button-primary" href="/notes">Open Notes</Link>
        </div>
      </div>
    </main>
  );
}
