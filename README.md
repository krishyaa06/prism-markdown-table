<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:00D2FF,100:F5C561&height=200&section=header&text=Prism%20Markdown%20Table&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=CSV%20%C2%B7%20Sheets%20%C2%B7%20JSON%20%E2%86%94%20Markdown&descAlignY=58&descSize=16" width="100%" alt="Prism Markdown Table" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=00D2FF&center=true&vCenter=true&width=680&lines=Paste+from+Google+Sheets;Get+a+perfect+Markdown+table;Edit%2C+sort%2C+align%2C+transpose;Export+CSV%2C+JSON+or+HTML" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-markdown-table/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-markdown-table/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-markdown-table/"><img src="https://img.shields.io/badge/Live_Demo-Open-00D2FF?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-00D2FF?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-markdown-table?style=for-the-badge&color=F5C561" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Markdown Table screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="" />

## ⚡ Overview

**Prism Markdown Table** converts tabular data into clean Markdown for READMEs, docs and GitHub issues. It auto-detects CSV, TSV (copied from Excel or Google Sheets), semicolon CSV, JSON and existing Markdown tables, then lets you edit cells, set alignment, sort columns and export to Markdown, CSV, JSON or HTML.

## ✨ Features

- **Auto-detect** CSV, TSV, `;`-separated, JSON and Markdown input
- **Aligned output** with column padding (wide characters and emoji aware)
- **Editable grid**: edit cells, add/delete rows and columns, transpose
- **Per-column alignment** (left / center / right) and **sorting**
- **Export** to Markdown, CSV, JSON or HTML
- Proper CSV quoting, escaped pipes, line breaks as `<br>`

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Markdown Table on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Markdown Table on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-markdown-table/](https://krishyaa06.github.io/prism-markdown-table/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-markdown-table.git
cd prism-markdown-table
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

Copy a range from Google Sheets and paste it into **Input**:

| Tool              | Stars |
| ----------------- | ----: |
| Prism JSON Studio |   128 |
| Prism Color Forge |   210 |

Use the header buttons to align or sort, then **Copy**.

## 📁 Project Structure

```text
prism-markdown-table/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # editable grid UI
│   ├── core.js   # parsers and exporters — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Markdown Table is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" alt="Soumya Bhandare" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:F5C561,50:00D2FF,100:07060f&height=110&section=footer" width="100%" alt="" />
