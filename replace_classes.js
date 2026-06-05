const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'services', 'page.js');
let content = fs.readFileSync(filePath, 'utf8');

// Colors
content = content.replace(/text-slate-/g, 'text-zinc-');
content = content.replace(/text-white/g, 'text-zinc-50');
content = content.replace(/bg-gradient-to-r from-cyan-400 to-blue-500/g, 'bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]');
content = content.replace(/bg-gradient-to-r from-cyan-500 to-blue-600/g, 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]');

// Borders & Backgrounds
content = content.replace(/border-cyan-500/g, 'border-[var(--accent)]');
content = content.replace(/border-blue-500/g, 'border-[var(--primary)]');
content = content.replace(/bg-cyan-500/g, 'bg-[var(--accent)]');
content = content.replace(/bg-blue-500/g, 'bg-[var(--primary)]');

// Typography
content = content.replace(/font-black/g, 'font-extrabold');

// Fix specific Hero Subtitle styles
content = content.replace(
    /<p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-3">/g,
    '<p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-3" style={fontBody}>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replacements complete.');
