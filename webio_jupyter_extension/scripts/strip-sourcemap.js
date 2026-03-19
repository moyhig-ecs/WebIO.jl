const fs = require('fs');
const path = require('path');

const targets = [
  path.resolve(__dirname, '..', 'dist', 'labextension.js'),
];

for (const t of targets) {
  try {
    if (!fs.existsSync(t)) continue;
    let s = fs.readFileSync(t, 'utf8');
    const cleaned = s.replace(/\n?\/\/#[#\s]*sourceMappingURL=.*$/gm, '');
    if (cleaned !== s) {
      fs.writeFileSync(t, cleaned, 'utf8');
      console.log('Stripped sourceMappingURL in', t);
    } else {
      console.log('No sourceMappingURL found in', t);
    }
  } catch (e) {
    console.error('Failed to strip sourceMappingURL for', t, e);
  }
}
