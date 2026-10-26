(() => {
  const { $, $$, copy, store, esc, debounce, tabs, toast } = Prism;
  let rows = [], align = [], out = "md", sortState = {};
  const SAMPLE = "Tool,Category,Stars,Status\nPrism JSON Studio,Dev Tools,128,Live\nPrism Regex Lab,Dev Tools,96,Live\nPrism Color Forge,Design,210,Live\nPrism Arena,Community,342,Beta";
  function fromInput() {
    const t = $("#input").value; store.set("mdt:input", t);
    const f = Core.detect(t); $("#fmt").textContent = f ? f.toUpperCase() : "";
    if (!f) { rows = []; align = []; draw(); return; }
    try { const p = Core.parse(t, f); rows = p.rows; align = p.align; } catch (e) { $("#res").textContent = e.message; return; }
    draw();
  }
  function output() {
    if (!rows.length) return "";
    return out === "csv" ? Core.toCSV(rows) : out === "json" ? Core.toJSON(rows) : out === "html" ? Core.toHTML(rows, align) : Core.toMarkdown(rows, align, { pretty: $("#pretty").checked });
  }
  function draw() {
    $("#res").textContent = output() || "Paste data on the left to get a table.";
    if (!rows.length) { $("#grid").innerHTML = '<tr><td class="empty">No data yet</td></tr>'; return; }
    const n = Math.max(...rows.map((r) => r.length));
    const head = `<tr><th class="del"></th>${Array.from({ length: n }, (_, i) => `<th><div contenteditable data-r="0" data-c="${i}">${esc(rows[0][i] ?? "")}</div><div class="hc">${[["left", "⇤"], ["center", "↔"], ["right", "⇥"]].map(([a, s]) => `<button class="${align[i] === a ? "on" : ""}" data-al="${a}" data-c="${i}" title="Align ${a}">${s}</button>`).join("")}<button data-sort="${i}" title="Sort">⇅</button><button data-dc="${i}" title="Delete column">✕</button></div></th>`).join("")}</tr>`;
    const body = rows.slice(1).map((r, ri) => `<tr><td class="del"><button data-dr="${ri + 1}" title="Delete row">✕</button></td>${Array.from({ length: n }, (_, i) => `<td><div contenteditable data-r="${ri + 1}" data-c="${i}">${esc(r[i] ?? "")}</div></td>`).join("")}</tr>`).join("");
    $("#grid").innerHTML = head + body;
  }
  const syncOut = debounce(() => { $("#res").textContent = output(); }, 80);
  $("#grid").addEventListener("input", (e) => { const d = e.target.dataset; if (d.r == null) return; rows[d.r][d.c] = e.target.textContent; syncOut(); });
  $("#grid").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return; const d = b.dataset;
    if (d.al) align[d.c] = align[d.c] === d.al ? null : d.al;
    else if (d.sort != null) { sortState[d.sort] = -(sortState[d.sort] || -1); rows = Core.sortBy(rows, +d.sort, sortState[d.sort]); }
    else if (d.dc != null) rows = rows.map((r) => r.filter((_, i) => i !== +d.dc)), align.splice(+d.dc, 1);
    else if (d.dr != null) rows.splice(+d.dr, 1);
    draw();
  });
  $("#addRow").onclick = () => { if (!rows.length) rows = [["Column 1"]]; rows.push(rows[0].map(() => "")); draw(); };
  $("#addCol").onclick = () => { if (!rows.length) rows = [[]]; rows.forEach((r, i) => r.push(i ? "" : `Column ${r.length + 1}`)); draw(); };
  $("#tr").onclick = () => { if (rows.length) { rows = Core.transpose(rows); align = []; draw(); } };
  $("#clear").onclick = () => { $("#input").value = ""; fromInput(); };
  $("#sample").onclick = () => { $("#input").value = SAMPLE; fromInput(); };
  $("#input").addEventListener("input", debounce(fromInput, 150));
  $("#pretty").onchange = draw;
  tabs($("#out"), (v) => { out = v; draw(); });
  $("#copy").onclick = () => (rows.length ? copy(output()) : toast("Nothing to copy"));
  $("#input").value = store.get("mdt:input", SAMPLE); fromInput();
})();
