import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const worker = await import(
  pathToFileURL(path.join(projectRoot, "dist", "server", "index.js")).href
);
const context = {
  waitUntil() {},
  passThroughOnException() {},
};
const response = await worker.default.fetch(
  new Request("http://localhost/"),
  {},
  context,
);

if (!response.ok) {
  throw new Error(`Could not render preview: ${response.status}`);
}

let html = await response.text();
const stylesheet = html.match(/href="\/assets\/([^"]+\.css)"/)?.[1];

if (!stylesheet) {
  throw new Error("Could not find the generated stylesheet.");
}

let css = await readFile(
  path.join(projectRoot, "dist", "client", "assets", stylesheet),
  "utf8",
);
const runtime = await readFile(
  path.join(projectRoot, "scripts", "static-preview-runtime.js"),
  "utf8",
);
const globeRenderer = await readFile(
  path.join(projectRoot, "public", "globe-renderer.js"),
  "utf8",
);
const worldMapSvg = await readFile(
  path.join(projectRoot, "public", "world-map.svg"),
  "utf8",
);
const worldMapDataUri = `data:image/svg+xml;base64,${Buffer.from(worldMapSvg).toString("base64")}`;

css = css.replaceAll('url("/world-map.svg")', 'url("public/world-map.svg")');
css = css.replaceAll('url("/assets/fonts/', 'url("public/assets/fonts/');

html = html
  .replace(/<link[^>]+(?:modulepreload|stylesheet)[^>]*>/g, "")
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replaceAll('src="/assets/', 'src="public/assets/')
  .replaceAll('poster="/assets/', 'poster="public/assets/')
  .replaceAll('href="/assets/', 'href="public/assets/')
  .replaceAll('content="/social-preview.png"', 'content="public/social-preview.png"')
  .replace('href="/favicon.svg"', 'href="public/favicon.svg"')
  .replace("</head>", `<style>${css}</style></head>`)
  .replace(
    "</body>",
    `<script>window.__WORLD_MAP_DATA_URI__=${JSON.stringify(worldMapDataUri)};</script><script>${globeRenderer}</script><script>${runtime}</script></body>`,
  );

const outputPath = path.join(
  projectRoot,
  "\u041f\u0420\u041e\u0421\u041c\u041e\u0422\u0420-\u0421\u0410\u0419\u0422\u0410.html",
);
const githubPagesDirectory = path.join(projectRoot, "github-pages");
const githubPagesPath = path.join(githubPagesDirectory, "index.html");
const { mkdir } = await import("node:fs/promises");

await mkdir(githubPagesDirectory, { recursive: true });

await Promise.all([
  writeFile(outputPath, html, "utf8"),
  writeFile(githubPagesPath, html, "utf8"),
]);

console.log(outputPath);
console.log(githubPagesPath);

