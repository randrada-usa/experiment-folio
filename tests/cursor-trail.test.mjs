import test from "node:test";
import assert from "node:assert/strict";
import { advanceTrail, createTrail, lockTrail } from "../src/cursor-trail.ts";

test("twenty tapered circles start together without an origin streak", () => {
  const dots = createTrail({ x: 100, y: 200 });
  assert.equal(dots.length, 20);
  assert.equal(dots[0].scale, 1);
  assert.ok(Math.abs(dots[19].scale - 0.05) < 1e-10);
  assert.ok(dots.every((dot) => dot.x === 100 && dot.y === 200));
});

test("head follows immediately and fast movement separates trailing circles", () => {
  const dots = createTrail({ x: 0, y: 0 });
  advanceTrail(dots, { x: 1000, y: 500 }, false);
  assert.equal(dots[0].x, 1000);
  assert.equal(dots[0].y, 500);
  assert.equal(dots[1].x, 650);
  assert.equal(dots[2].x, 422.5);
  assert.ok(dots[0].x - dots[1].x > 26);
  for (let i = 0; i < 100; i++) advanceTrail(dots, { x: 1000, y: 500 }, false);
  assert.ok(dots.every((dot) => Math.abs(dot.x - 1000) < 0.01));
});

test("idle flutter leaves the head anchored and bounds each tail circle", () => {
  const dots = createTrail({ x: 100, y: 200 });
  lockTrail(dots);
  advanceTrail(dots, { x: 100, y: 200 }, true);
  assert.ok(dots.slice(0, 7).every((dot) => dot.x === 100 && dot.y === 200));
  assert.ok(dots.slice(7).some((dot) => dot.x !== 100));
  assert.ok(dots.every((dot) => Math.abs(dot.x - 100) <= 15));
  advanceTrail(dots, { x: 250, y: 300 }, false);
  assert.equal(dots[0].x, 250);
});
