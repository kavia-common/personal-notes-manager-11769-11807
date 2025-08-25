"use client";

import React from "react";

/**
 * A very minimal markdown renderer for common formatting without external packages.
 * Supports: #, ##, ### headers, **bold**, *italic*, `code`, and paragraphs/line breaks.
 * For production-grade rendering, integrate a markdown library, but we avoid extra deps per constraints.
 */
function simpleMarkdownToHtml(md: string): string {
  let html = md;
  // Escape HTML tags
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Code inline `code`
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Bold **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic *text*
  html = html.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  // Headers
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  // Paragraphs and line breaks
  html = html
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
  return html;
}

/**
 * PUBLIC_INTERFACE
 * MarkdownView: Renders markdown content inside styled container.
 */
export default function MarkdownView({ content }: { content: string }) {
  const html = React.useMemo(() => simpleMarkdownToHtml(content || ""), [content]);
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />;
}
