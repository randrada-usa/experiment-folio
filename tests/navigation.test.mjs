import test from "node:test";
import assert from "node:assert/strict";
import { continuationProgress, wheelPixels } from "../src/navigation-model.ts";

test("continuation requires downward wheel at the bottom and clamps its threshold", () => {
  assert.equal(continuationProgress(300, 800, false), 0);
  assert.equal(continuationProgress(300, -20, true), 0);
  assert.equal(continuationProgress(300, 800, true), 1100);
  assert.equal(continuationProgress(5900, 800, true), 6000);
});
test("normalizes wheel delta units", () => {
  assert.equal(wheelPixels(3, 0, 900), 3);
  assert.equal(wheelPixels(3, 1, 900), 48);
  assert.equal(wheelPixels(3, 2, 900), 2700);
});
