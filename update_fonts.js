const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'services', 'page.js');
let content = fs.readFileSync(filePath, 'utf8');

// Add fontHeadline to all <h2> and <h3> tags
content = content.replace(/<h2 (className="[^"]*")/g, '<h2 $1 style={fontHeadline}');
content = content.replace(/<h3 (className="[^"]*")/g, '<h3 $1 style={fontHeadline}');

// Add fontBody to all <p> tags without it
content = content.replace(/<p (className="[^"]*")>/g, function(match, p1) {
    if (match.includes('style=')) return match;
    return `<p ${p1} style={fontBody}>`;
});

// Update specific buttons to use the label font (fontLabel) if they look like buttons or badges
// Like the "What I Build", "How It Works" etc badges.
content = content.replace(/<div (className="inline-[^"]*uppercase[^"]*")>/g, '<div $1 style={fontLabel}>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fonts updated.');
