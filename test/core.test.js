const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");

test("detects formats", () => {
  assert.equal(C.detect("a,b\n1,2"), "csv");
  assert.equal(C.detect("a\tb\n1\t2"), "tsv");
  assert.equal(C.detect('[{"a":1}]'), "json");
  assert.equal(C.detect("| a | b |\n| - | - |\n| 1 | 2 |"), "markdown");
});
test("CSV with quotes and newlines", () => {
  assert.deepEqual(C.parseDelimited('name,note\n"Doe, J","said ""hi"""\n', ","), [["name", "note"], ["Doe, J", 'said "hi"']]);
});
test("markdown output is aligned", () => {
  const md = C.toMarkdown([["Name", "N"], ["ab", "1"], ["c", "200"]], [null, "right"]);
  assert.equal(md, "| Name |   N |\n| ---- | --: |\n| ab   |   1 |\n| c    | 200 |");
});
test("markdown round trip keeps alignment and pipes", () => {
  const md = C.toMarkdown([["a|b", "c"], ["1", "2"]], ["center", "left"]);
  const p = C.parseMarkdown(md);
  assert.deepEqual(p.rows, [["a|b", "c"], ["1", "2"]]);
  assert.deepEqual(p.align, ["center", "left"]);
});
test("JSON in and out", () => {
  const p = C.parse('[{"a":1,"b":"x"},{"a":2}]');
  assert.deepEqual(p.rows, [["a", "b"], ["1", "x"], ["2", ""]]);
  assert.deepEqual(JSON.parse(C.toJSON(p.rows)), [{ a: "1", b: "x" }, { a: "2", b: "" }]);
});
test("sort and transpose", () => {
  assert.deepEqual(C.sortBy([["n"], ["10"], ["9"]], 0).map((r) => r[0]), ["n", "9", "10"]);
  assert.deepEqual(C.transpose([["a", "b"], ["1", "2"]]), [["a", "1"], ["b", "2"]]);
});
