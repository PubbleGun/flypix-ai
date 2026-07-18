import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete FlyPix landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>FlyPix AI .* Geospatial AI Platform<\/title>/i);
  assert.match(html, /social-preview\.png/i);
  assert.match(html, /Detect and count anything from the sky/i);
  assert.match(html, /From imagery[\s\S]*to action/i);
  assert.match(html, /Built for every[\s\S]*kind of scene/i);
  assert.match(html, /Save 99\.7% of[\s\S]*review time/i);
  assert.match(html, /What teams[\s\S]*are saying/i);
  assert.match(html, /See the whole picture[\s\S]*Act on what matters/i);
  assert.doesNotMatch(html, /Codex is working|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the interactive and responsive implementation in place", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="hero-globe-canvas"/);
  assert.match(page, /data-detection-marker/);
  assert.match(page, /getContext\("webgl"/);
  assert.match(page, /uniform float uRotation/);
  assert.match(page, /pointermove/);
  assert.match(page, /ArrowLeft/);
  assert.match(page, /role="slider"/);
  assert.match(page, /IntersectionObserver/);
  assert.match(css, /@media \(max-width: 1020px\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /prefers-reduced-motion/);
});

test("ships the imagery, videos, and map used by the page", async () => {
  await Promise.all([
    access(new URL("../public/world-map.svg", import.meta.url)),
    access(new URL("../public/globe-renderer.js", import.meta.url)),
    access(new URL("../public/social-preview.png", import.meta.url)),
    access(new URL("../public/assets/source/satellite.svg", import.meta.url)),
    access(new URL("../public/assets/source/aircraft.svg", import.meta.url)),
    access(new URL("../public/assets/source/drone.svg", import.meta.url)),
    access(new URL("../public/assets/claude/asset-01.webp", import.meta.url)),
    access(new URL("../public/assets/claude/asset-29.webp", import.meta.url)),
    access(
      new URL(
        "../public/assets/figma/91176b20c94d1dc4286779dce0561ca16a27b5ce.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/assets/figma/6f93840aa60896f452d8ac14ea38eab3cc715fe1.mp4",
        import.meta.url,
      ),
    ),
  ]);
});
