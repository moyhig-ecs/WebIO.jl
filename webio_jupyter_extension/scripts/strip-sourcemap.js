const fs = require('fs');
const path = require('path');

// Recursively find JS files under these target directories and clean them.
const roots = [
  path.resolve(__dirname, '..', 'dist'),
  path.resolve(__dirname, '..', 'webio_jupyter_extension'),
  path.resolve(__dirname, '..', 'webio_jupyter_extension', 'labextension', 'static'),
];

function walkDir(dir) {
  const list = [];
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) list.push(...walkDir(full));
    else if (stat.isFile() && full.endsWith('.js')) list.push(full);
  }
  return list;
}

function cleanFile(filePath) {
  try {
    let s = fs.readFileSync(filePath, 'utf8');
    const before = s;

    // Aggressively remove any form of sourceMappingURL occurrences because
    // source maps are not needed for development and the Jupyter builder
    // fails when stray or inline maps are present.
    // 1) Remove block comment sourceMappingURL (/*# sourceMappingURL=... */)
    s = s.replace(/\/\*#\s*sourceMappingURL=[\s\S]*?\*\//g, '');

    // 2) Remove line comment forms (// #sourceMappingURL, // @sourceMappingURL)
    s = s.replace(/(^|\r?\n)\s*\/\/[#@\s]*sourceMappingURL=.*$/gm, '$1');

    // 3) Remove inline base64 data URLs
    s = s.replace(/sourceMappingURL=data:application\/json;?base64,[A-Za-z0-9+\/=]+/g, '');

    // 4) Remove any remaining sourceMappingURL=... occurrences (e.g. .map references)
    s = s.replace(/sourceMappingURL=[^\)\s'";]+/g, '');

    if (s !== before) {
      fs.writeFileSync(filePath, s, 'utf8');
      console.log('Cleaned sourceMappingURL/base64 in', filePath);
    }
  } catch (e) {
    console.error('Failed to clean', filePath, e);
  }
}

for (const root of roots) {
  const files = walkDir(root);
  for (const f of files) cleanFile(f);
}

// Also attempt the single dist file as a fallback for older builds
const fallback = path.resolve(__dirname, '..', 'dist', 'labextension.js');
if (fs.existsSync(fallback)) cleanFile(fallback);
