"use client";

import React, { useEffect, useState } from "react";
import type { Note } from "../lib/types";
import MarkdownView from "./MarkdownView";

type Props = {
  note: Note | null;
  onSave: (note: { title: string; content: string; tags?: string[] }) => Promise<void>;
  onDelete: () => Promise<void>;
  saving: boolean;
  deleting: boolean;
};

/**
 * PUBLIC_INTERFACE
 * NoteEditor: Main editor for a note with live markdown preview.
 */
export default function NoteEditor({ note, onSave, onDelete, saving, deleting }: Props) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState<string>((note?.tags || []).join(", "));

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setTags((note?.tags || []).join(", "));
  }, [note?.id, note?.title, note?.content, note?.tags]);

  const parsedTags = React.useMemo(
    () =>
      tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tags]
  );

  const canSave = title.trim().length > 0 || content.trim().length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              className="input"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Note title"
            />
            <input
              className="input mt-2"
              placeholder="tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              aria-label="Note tags"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="button button-secondary"
              onClick={() => {
                setTitle("");
                setContent("");
                setTags("");
              }}
            >
              Clear
            </button>
            <button
              className="button button-primary"
              disabled={!canSave || saving}
              onClick={async () => {
                await onSave({ title, content, tags: parsedTags });
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            {note?.id ? (
              <button className="button button-secondary" onClick={onDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 flex-1 min-h-0">
        <div className="p-4 h-full flex flex-col">
          <label className="text-sm text-gray-500 mb-2">Markdown</label>
          <textarea
            className="textarea flex-1 min-h-[300px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Start writing in Markdown..."
          />
        </div>
        <div className="p-4 border-l overflow-auto" style={{ borderColor: "var(--color-border)" }}>
          <label className="text-sm text-gray-500 mb-2 block">Preview</label>
          <div className="card p-4">
            <MarkdownView content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
