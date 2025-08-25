"use client";

import React, { useState } from "react";
import { AuthProvider, useAuth } from "../../lib/auth-context";

/**
 * PUBLIC_INTERFACE
 * SignInInner: Sign-in form that performs login and redirects to /notes on success.
 */
function SignInInner() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      window.location.href = "/notes";
    } catch (err) {
      const message =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: string }).message || "Sign-in failed")
          : "Sign-in failed";
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card p-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-xl" style={{ background: "var(--color-primary)" }} />
          <h1 className="text-xl font-semibold">Sign in</h1>
        </div>
        <form className="space-y-3" onSubmit={onSubmit}>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              className="input mt-1"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              className="input mt-1"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          <button className="button button-primary w-full" type="submit" disabled={busy}>
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="text-sm text-gray-600 mt-4">
          No account? <a className="text-blue-600" href="/signup">Create one</a>
        </div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * SignInPage: Wrapper with AuthProvider.
 */
export default function SignInPage() {
  return (
    <AuthProvider>
      <SignInInner />
    </AuthProvider>
  );
}
