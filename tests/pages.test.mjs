import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { projects } from "../src/content.ts";
import { projectStudies } from "../src/project-studies.ts";
import { projectCaseContent } from "../src/project-case-content.ts";
import { getPageKind, getProjectSlug, nextPage } from "../src/pages.ts";

test("every project has its own static entry, story and local image", () => {
  assert.equal(projects.length, 6);
  for (const project of projects) {
    assert.ok(
      existsSync(
        new URL(`../projects/${project.slug}/index.html`, import.meta.url),
      ),
    );
    assert.ok(
      existsSync(
        new URL(
          `../public/assets/projects/${project.image}-detail-1920.webp`,
          import.meta.url,
        ),
      ),
    );
    assert.ok(projectStudies[project.slug]);
    const story = projectCaseContent[project.slug];
    assert.ok(story.challenge && story.approach.length && story.results.length);
    for (const suffix of ["", "/", "/index.html"]) {
      const route = `/projects/${project.slug}${suffix}`;
      assert.equal(getPageKind(route), "project");
      assert.equal(getProjectSlug(route), project.slug);
    }
  }
});

test("collection and CV routes resolve without matching nested paths", () => {
  for (const [route, kind] of [
    ["projects", "projects"],
    ["certifications", "certificates"],
    ["cv", "cv"],
  ]) {
    for (const suffix of ["", "/", "/index.html"])
      assert.equal(getPageKind(`/${route}${suffix}`), kind);
  }
  assert.equal(getProjectSlug("/projects/"), undefined);
  assert.equal(getProjectSlug("/projects/duely/extra"), undefined);
  assert.equal(nextPage.project.href, "/projects/");
  assert.equal(nextPage.cv.href, "/projects/");
});

test("local CV assets exist and use the public August 2026 version", () => {
  for (const file of [
    "Rey-Jane-Andrada-CV-2026-08.pdf",
    "rey-jane-andrada-cv-preview-2026-08-v3.webp",
  ]) {
    assert.ok(
      existsSync(new URL(`../public/assets/cv/${file}`, import.meta.url)),
    );
  }
});
