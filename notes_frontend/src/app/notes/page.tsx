"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AuthProvider, useAuth } from "../../lib/auth-context";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import NoteList from "../../components/NoteList";
import NoteEditor from "../../components/NoteEditor";
import EmptyState from "../../components/EmptyState";
import { createNote, deleteNote, getNote, listNotes, updateNote } from "../../lib/api";
import type { Note } from "../../lib/types";

/**
 * PUBLIC_INTERFACE
 * NotesInner: Auth-guarded inner app with CRUD operations and filters.
 */
function NotesInner() {
  const { user, loading } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load notes on mount and when filters change
  useEffect(() => {
    if (!user) return;
    listNotes({ search, tag: selectedTag || undefined })
      .then((ns) => {
        setNotes(ns);
        if (ns.length > 0 && !activeId) {
          setActiveId(ns[0].id);
        }
      })
      .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, search, selectedTag]);

  // Load active note content when activeId changes
  useEffect(() => {
    if (!activeId) {
      setActiveNote(null);
      return;
    }
    getNote(activeId)
      .then((n) => setActiveNote(n))
      .catch((e) => console.error(e));
  }, [activeId]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => (n.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const onNewNote = async () => {
    setIsSaving(true);
    try {
      const created = await createNote({
        title: "Untitled",
        content: "",
        tags: [],
      });
      // Reload notes quickly
      const ns = await listNotes({ search, tag: selectedTag || undefined });
      setNotes(ns);
      setActiveId(created.id);
    } catch (e) {
      console.error(e);
      alert("Failed to create note.");
    } finally {
      setIsSaving(false);
    }
  };

  const onSave = async (payload: { title: string; content: string; tags?: string[] }) => {
    if (activeNote?.id) {
      setIsSaving(true);
      try {
        await updateNote(activeNote.id, payload);
        const ns = await listNotes({ search, tag: selectedTag || undefined });
        setNotes(ns);
      } catch {
        alert("Failed to save note.");
      } finally {
        setIsSaving(false);
      }
    } else {
      // create if there is no active note (shouldn't happen often from editor)
      setIsSaving(true);
      try {
        const created = await createNote(payload);
        const ns = await listNotes({ search, tag: selectedTag || undefined });
        setNotes(ns);
        setActiveId(created.id);
      } catch {
        alert("Failed to create note.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const onDelete = async () => {
    if (!activeNote?.id) return;
    if (!confirm("Delete this note?")) return;
    setIsDeleting(true);
    try {
      await deleteNote(activeNote.id);
      const ns = await listNotes({ search, tag: selectedTag || undefined });
      setNotes(ns);
      setActiveId(ns[0]?.id ?? null);
    } catch {
      alert("Failed to delete note.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header search={search} onSearchChange={setSearch} onNewNote={onNewNote} />
      <div className="app-shell" role="main">
        <Sidebar
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] min-h-[calc(100vh-60px)]">
          <NoteList notes={notes} activeId={activeId} onSelect={setActiveId} />
          <div className="min-h-0">
            {activeNote ? (
              <NoteEditor
                note={activeNote}
                onSave={onSave}
                onDelete={onDelete}
                saving={isSaving}
                deleting={isDeleting}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * NotesPage: Top-level page with AuthProvider wrapper.
 */
export default function NotesPage() {
  return (
    <AuthProvider>
      <NotesInner />
    </AuthProvider>
  );
}
