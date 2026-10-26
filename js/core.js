/* Prism Markdown Table · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  function parseDelimited(text, delim) {
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
      else if (c === '"' && cell === "") q = true;
      else if (c === delim) { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
      else cell += c;
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    return rows.filter((r) => r.some((c) => c.trim() !== ""));
  }
  function parseMarkdown(text) {
    const lines = text.trim().split(/\r?\n/).filter((l) => l.trim().startsWith("|") || l.includes("|"));
    if (lines.length < 2) throw new Error("A Markdown table needs a header and a separator row");
    const split = (l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));
    const sep = split(lines[1]);
    if (!sep.every((s) => /^:?-{1,}:?$/.test(s))) throw new Error("Second row must be a separator like | --- | :---: |");
    const align = sep.map((s) => (s.startsWith(":") && s.endsWith(":") ? "center" : s.endsWith(":") ? "right" : s.startsWith(":") ? "left" : null));
    return { rows: [split(lines[0]), ...lines.slice(2).map(split)], align };
  }
  function detect(text) {
    const t = text.trim();
    if (!t) return null;
    if (/^[[{]/.test(t)) { try { JSON.parse(t); return "json"; } catch {} }
    const lines = t.split(/\r?\n/);
    if (lines.length > 1 && /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(lines[1])) return "markdown";
    if ((lines[0].match(/\t/g) || []).length) return "tsv";
    if ((lines[0].match(/;/g) || []).length > (lines[0].match(/,/g) || []).length) return "ssv";
    return "csv";
  }
  function parse(text, fmt = detect(text)) {
    if (fmt === "markdown") return parseMarkdown(text);
    if (fmt === "json") {
      let v = JSON.parse(text); if (!Array.isArray(v)) v = [v];
      if (v.every(Array.isArray)) return { rows: v.map((r) => r.map(String)), align: [] };
      const cols = [...new Set(v.flatMap((o) => Object.keys(o || {})))];
      return { rows: [cols, ...v.map((o) => cols.map((c) => (o[c] == null ? "" : typeof o[c] === "object" ? JSON.stringify(o[c]) : String(o[c]))))], align: [] };
    }
    return { rows: parseDelimited(text, fmt === "tsv" ? "\t" : fmt === "ssv" ? ";" : ","), align: [] };
  }
  const width = (s) => [...s].reduce((w, ch) => w + (/[\u1100-\u115F\u2E80-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]|[\u{1F300}-\u{1FAFF}]/u.test(ch) ? 2 : 1), 0);
  function toMarkdown(rows, align = [], { pretty = true } = {}) {
    if (!rows.length) return "";
    const n = Math.max(...rows.map((r) => r.length));
    const norm = rows.map((r) => Array.from({ length: n }, (_, i) => String(r[i] ?? "").replace(/\|/g, "\\|").replace(/\n/g, "<br>")));
    const w = Array.from({ length: n }, (_, i) => Math.max(3, ...norm.map((r) => width(r[i]))));
    const pad = (s, i) => { if (!pretty) return s; const extra = w[i] - width(s); const a = align[i]; if (a === "right") return " ".repeat(extra) + s; if (a === "center") return " ".repeat(Math.floor(extra / 2)) + s + " ".repeat(Math.ceil(extra / 2)); return s + " ".repeat(extra); };
    const line = (r) => `| ${r.map(pad).join(" | ")} |`;
    const sep = `| ${w.map((x, i) => { const len = pretty ? x : 3; const a = align[i]; return a === "center" ? ":" + "-".repeat(len - 2) + ":" : a === "right" ? "-".repeat(len - 1) + ":" : a === "left" ? ":" + "-".repeat(len - 1) : "-".repeat(len); }).join(" | ")} |`;
    return [line(norm[0]), sep, ...norm.slice(1).map(line)].join("\n");
  }
  function toCSV(rows, d = ",") { return rows.map((r) => r.map((c) => (/["\n,;\t]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(d)).join("\n"); }
  function toJSON(rows) { const [h, ...b] = rows; return JSON.stringify(b.map((r) => Object.fromEntries(h.map((k, i) => [k || `col${i + 1}`, r[i] ?? ""]))), null, 2); }
  function toHTML(rows, align = []) {
    const e = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const st = (i) => (align[i] ? ` style="text-align:${align[i]}"` : "");
    const [h, ...b] = rows;
    return `<table>\n  <thead>\n    <tr>${h.map((c, i) => `<th${st(i)}>${e(c)}</th>`).join("")}</tr>\n  </thead>\n  <tbody>\n${b.map((r) => `    <tr>${h.map((_, i) => `<td${st(i)}>${e(r[i] ?? "")}</td>`).join("")}</tr>`).join("\n")}\n  </tbody>\n</table>`;
  }
  function sortBy(rows, col, dir = 1) {
    const [h, ...b] = rows;
    const num = b.every((r) => r[col] === "" || !isNaN(parseFloat(r[col])));
    return [h, ...b.sort((x, y) => (num ? (parseFloat(x[col]) || 0) - (parseFloat(y[col]) || 0) : String(x[col]).localeCompare(String(y[col]))) * dir)];
  }
  const transpose = (rows) => { const n = Math.max(...rows.map((r) => r.length)); return Array.from({ length: n }, (_, i) => rows.map((r) => r[i] ?? "")); };
  return { detect, parse, parseDelimited, parseMarkdown, toMarkdown, toCSV, toJSON, toHTML, sortBy, transpose };
});
