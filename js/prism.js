/* Prism Protocol shared helpers */
(function (g) {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  let t;
  function toast(msg) {
    let el = $(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show"); clearTimeout(t); t = setTimeout(() => el.classList.remove("show"), 1800);
  }
  async function copy(text, msg = "Copied to clipboard") {
    try { await navigator.clipboard.writeText(text); } catch { const a = document.createElement("textarea"); a.value = text; document.body.appendChild(a); a.select(); document.execCommand("copy"); a.remove(); }
    toast(msg);
  }
  function download(name, text, type = "text/plain") {
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 500);
  }
  const store = {
    get(k, d) { try { const v = localStorage.getItem("prism:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("prism:" + k, JSON.stringify(v)); } catch {} },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const debounce = (fn, ms = 200) => { let id; return (...a) => { clearTimeout(id); id = setTimeout(() => fn(...a), ms); }; };
  function tabs(root, onChange) {
    $$("button", root).forEach((b) => b.addEventListener("click", () => { $$("button", root).forEach((x) => x.classList.toggle("on", x === b)); onChange(b.dataset.v); }));
  }
  g.Prism = { $, $$, toast, copy, download, store, esc, debounce, tabs };
})(window);
