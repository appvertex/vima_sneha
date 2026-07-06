import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..', '..');
const frontendHead = resolve(root, 'frontend', 'Head');
const outFile = resolve(root, 'backend', 'src', 'admin-ui.generated.js');
const pagesAssetBase = 'https://vima-sneha.pages.dev/assets/';

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
  generated[key] = source.replaceAll('../assets/', pagesAssetBase);
}

const moduleSource = `export const ADMIN_UI = ${JSON.stringify(generated, null, 2)};
`;

writeFileSync(outFile, moduleSource);
console.log(`Wrote ${outFile}`);
