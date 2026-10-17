import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import {
  certificates,
  featuredCertificates,
  filterCertificates,
  certificateFilters,
  certificationCategories,
} from "../src/certificates.ts";

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

test("complete collection has unique canonical slugs and real dimensioned images", () => {
  assert.equal(certificates.length, 27);
  assert.equal(
    new Set(certificates.map((item) => item.slug)).size,
    certificates.length,
  );
  for (const item of certificates) {
    assert.ok(item.title && item.issuer && item.description && item.year);
    assert.ok(certificationCategories.includes(item.category));
    assert.ok(item.width > 0 && item.height > 0);
    assert.ok(
      existsSync(new URL(`../public${item.image}`, import.meta.url)),
      item.image,
    );
  }
  assert.equal(
    certificates.find((item) => item.title === "Docker & Kubernetes").slug,
    "docker-and-kubernetes",
  );
  assert.deepEqual(featuredCertificates, certificates.slice(0, 10));
});

test("search combines title, issuer and description terms with category", () => {
  assert.equal(filterCertificates("   ").length, 27);
  assert.equal(filterCertificates("  DATACAMP  ").length, 5);
  assert.deepEqual(
    filterCertificates("DataCamp", "Cloud & Development").map(
      (item) => item.slug,
    ),
    ["python-developer-associate"],
  );
  assert.deepEqual(
    filterCertificates("networking protocols").map((item) => item.slug),
    ["networking-basics"],
  );
  assert.equal(filterCertificates("nonexistent-credential").length, 0);
  assert.equal(filterCertificates("Anthropic", "Data & Analytics").length, 0);
  assert.deepEqual(
    certificationCategories.map(
      (category) => filterCertificates("", category).length,
    ),
    [4, 6, 8, 2, 7],
  );
});

test("URL filters decode safely and reject unknown categories", () => {
  assert.deepEqual(
    certificateFilters("?q=AWS+cloud&category=Cloud+%26+Development"),
    { query: "AWS cloud", category: "Cloud & Development" },
  );
  assert.deepEqual(certificateFilters("?category=unknown"), {
    query: "",
    category: "All",
  });
});
