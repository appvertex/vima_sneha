import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..', '..');
const frontendHead = resolve(root, 'frontend', 'Head');
const frontendAssets = resolve(root, 'frontend', 'assets');
const outFile = resolve(root, 'backend', 'src', 'admin-ui.generated.js');
const pagesAssetBase = 'https://vima-sneha.pages.dev/assets/';
const inlineEditorPages = new Set([
  'admin-gallery.html',
  'admin-news.html',
  'admin-contact.html',
  'admin-insurance-pages.html'
]);

const files = {
  login: 'admin-login.html',
  main: 'admin.html',
  counselling: 'admin-counselling.html',
  insurance: 'admin-insurance.html',
  gallery: 'admin-gallery.html',
  news: 'admin-news.html',
  contact: 'admin-contact.html',
  insurancePages: 'admin-insurance-pages.html',
  pages: 'admin-pages.html'
};

const generated = {};
for (const [key, filename] of Object.entries(files)) {
  const source = readFileSync(resolve(frontendHead, filename), 'utf8');
  let html = source;
  if (inlineEditorPages.has(filename)) {
    const editorCss = readFileSync(resolve(frontendAssets, 'css', 'admin-section-editor.css'), 'utf8');
    const editorJs = readFileSync(resolve(frontendAssets, 'js', 'admin-section-editor.js'), 'utf8');
    html = html
      .replace(
        '<link rel="stylesheet" href="../assets/css/admin-section-editor.css">',
        `<style>\n${editorCss}\n</style>`
      )
      .replace(
        /<script src="\.\.\/assets\/js\/admin-section-editor\.js[^"]*"><\/script>/,
        `<script>\n${editorJs}\n</script>`
      );
  }
  html = html.replaceAll('../assets/', pagesAssetBase);
  generated[key] = html;
}

const moduleSource = `export const ADMIN_UI = ${JSON.stringify(generated, null, 2)};
`;

writeFileSync(outFile, moduleSource);
console.log(`Wrote ${outFile}`);
