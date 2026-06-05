const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'services', 'AuditForm.js');
let content = fs.readFileSync(filePath, 'utf8');

// Colors
content = content.replace(/text-slate-/g, 'text-zinc-');
content = content.replace(/text-white/g, 'text-zinc-50');
content = content.replace(/bg-gradient-to-r from-cyan-500 to-blue-600/g, 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]');

// Borders, Backgrounds, Text, Focus Rings
content = content.replace(/border-cyan-500/g, 'border-[var(--primary)]');
content = content.replace(/bg-cyan-500/g, 'bg-[var(--primary)]');
content = content.replace(/text-cyan-400/g, 'text-[var(--primary)]');
content = content.replace(/text-cyan-500/g, 'text-[var(--primary)]');
content = content.replace(/focus:border-cyan-500\/50 focus:ring-cyan-500\/50/g, 'focus:border-[var(--primary)]/50 focus:ring-[var(--primary)]/50');
content = content.replace(/focus:border-cyan-500/g, 'focus:border-[var(--primary)]');
content = content.replace(/focus:ring-cyan-500/g, 'focus:ring-[var(--primary)]');

// Typography
content = content.replace(/font-black/g, 'font-extrabold');

fs.writeFileSync(filePath, content, 'utf8');
console.log('AuditForm replacements complete.');
