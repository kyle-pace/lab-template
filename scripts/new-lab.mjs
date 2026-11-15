// Turns a fresh copy of lab-template into a new lab. Run once, right after making the
// repo from the template:
//
//   npm run new-lab -- <slug> "<Name>" "<One sentence about what it does.>"
//   npm run new-lab -- tide-clock "Tide clock" "Puget Sound tides as a clock face."
//
// It puts the slug, name and description everywhere the template has placeholders
// (lab-slug, Lab Name, Lab description.), moves the page and public folders to the new
// slug, drops the template-only parts of the README and AGENTS.md, and deletes itself.
// Nothing outside this folder is touched.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';

const [slug, name, description] = process.argv.slice(2);

// Paths the hub, kylepace.dev, already uses for its own pages.
const TAKEN = ['labs', 'apps', 'log', 'how-i-build', 'privacy', 'accessibility', 'connections', 'badges', 'projects.json', 'og', 'lab-slug'];

function fail(message) {
  console.error(`\n${message}\n\nUsage: npm run new-lab -- <slug> "<Name>" "<One sentence about what it does.>"\n`);
  process.exit(1);
}

if (!slug || !name || !description) fail('Give a slug, a name and a one-sentence description.');
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`"${slug}" isn't a usable slug: lowercase letters, numbers and single hyphens only.`);
if (TAKEN.includes(slug)) fail(`kylepace.dev/${slug}/ is already used by the hub. Pick another slug.`);
if (!existsSync('src/pages/lab-slug')) fail('This copy has already been set up (src/pages/lab-slug/ is gone).');

const sentence = /[.!?]$/.test(description) ? description : `${description}.`;

// Every text file Git knows about, minus this script and the lockfile.
const files = execSync('git ls-files', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && !/\.(png|jpe?g|webp|avif|ico|woff2?)$/.test(f))
  .filter((f) => f !== 'scripts/new-lab.mjs' && f !== 'package-lock.json');

let changed = 0;
for (const file of files) {
  if (!existsSync(file)) continue;
  const before = readFileSync(file, 'utf8');
  let after = before
    // Template-only blocks (setup instructions) go away.
    .replace(/<!-- template:start -->[\s\S]*?<!-- template:end -->\n*/g, '')
    .replaceAll('Lab description.', sentence)
    .replaceAll('Lab Name', name)
    .replaceAll('lab-slug', slug);
  if (file === 'package.json') {
    const pkg = JSON.parse(after);
    delete pkg.scripts['new-lab'];
    after = `${JSON.stringify(pkg, null, 2)}\n`;
  }
  if (after !== before) {
    writeFileSync(file, after);
    changed++;
  }
}

// The lockfile only carries the package name; npm rewrites it on the next install.
if (existsSync('package-lock.json')) {
  const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  lock.name = slug;
  if (lock.packages?.['']) lock.packages[''].name = slug;
  writeFileSync('package-lock.json', `${JSON.stringify(lock, null, 2)}\n`);
}

renameSync('src/pages/lab-slug', `src/pages/${slug}`);
renameSync('public/lab-slug', `public/${slug}`);
rmSync('scripts/new-lab.mjs');

console.log(`
Set up ${name} at kylepace.dev/${slug}/ (${changed} files updated).

Next:
  1. Write design/PLAN.md, then give the lab its look in src/styles/theme.css.
  2. Build the app in src/pages/${slug}/index.astro, and fill in the About page.
  3. Restyle design/og*.html in the lab's look and run npm run og.
  4. npm run build && npm run check, then commit and push.
  5. Connect the repo in Cloudflare Workers Builds, and list the lab on kylepace.dev
     (the add-lab skill in kyle-pace/kylepace.dev). Both are in the README.
`);
