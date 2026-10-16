import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { featuredCertificates } from "../src/certificates.ts";

test("homepage certificate preview contains ten unique real assets", () => {
  assert.equal(featuredCertificates.length, 10);
  assert.equal(new Set(featuredCertificates.map((item) => item.slug)).size, 10);
  for (const item of featuredCertificates) {
    assert.ok(item.title && item.issuer);
    assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(
      existsSync(new URL(`../public${item.image}`, import.meta.url)),
      item.image,
    );
  }
});
