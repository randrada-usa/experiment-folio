import test from "node:test";
import assert from "node:assert/strict";
import { createEmailDraft, emptyDraft } from "../src/inquiry-model.ts";

test("encodes a complete draft without sending anything", () => {
  const result = createEmailDraft(
    {
      ...emptyDraft,
      name: "Demo Visitor",
      email: "demo@example.com",
      kind: "Collaboration",
      topics: ["API integrations", "Database design"],
      message: "A & B? Yes + café.",
    },
    "owner@example.com",
  );
  const url = new URL(result.href);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.searchParams.get("subject"), "Collaboration — Demo Visitor");
  assert.match(url.searchParams.get("body"), /A & B\? Yes \+ café\./);
  assert.match(result.body, /API integrations, Database design/);
});
test("handles optional fields and strips subject line breaks", () => {
  const result = createEmailDraft(
    { ...emptyDraft, name: " Demo\r\nVisitor ", email: "demo@example.com" },
    "owner@example.com",
  );
  assert.equal(result.subject, "Portfolio inquiry — Demo Visitor");
  assert.match(result.body, /Website: Not provided/);
  assert.match(result.copy, /To: owner@example.com/);
});
