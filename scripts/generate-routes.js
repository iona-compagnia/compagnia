import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const MUSICIANS_JSON_PATH = path.join(__dirname, '../src/data/musicians.json');

const staticRoutes = [
  'about',
  'director',
  'events',
  'musicians',
  'contact',
  'archduke',
  'subscribe'
];

function generateRoutes() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.warn('dist/index.html not found, skipping route generation.');
    return;
  }

  const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  // Read musician ids
  let musicianRoutes = [];
  try {
    const musicians = JSON.parse(fs.readFileSync(MUSICIANS_JSON_PATH, 'utf-8'));
    musicianRoutes = musicians.map(m => m.id).filter(Boolean);
  } catch (err) {
    console.error('Error reading musicians.json:', err);
  }

  const allRoutes = [...new Set([...staticRoutes, ...musicianRoutes])];
  const subrouteHtml = indexHtml.replace(/<link rel="preload" as="image"[^>]*>\s*/i, '');

  for (const route of allRoutes) {
    const routeDir = path.join(DIST_DIR, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), subrouteHtml, 'utf-8');
  }

  console.log(`Generated static entrypoints for ${allRoutes.length} routes in dist/`);
}

generateRoutes();
