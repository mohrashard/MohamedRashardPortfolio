const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Tone down neon glows to standard subtle tailwind shadows
            // shadow-[0_0_30px_rgba(0,102,255,0.4)] -> shadow-lg shadow-blue-500/20
            // hover:shadow-[0_0_50px_rgba(...)] -> hover:shadow-xl hover:shadow-blue-500/30
            
            let originalContent = content;
            
            // Replace extreme glows with subtle ones
            content = content.replace(/shadow-\[0_0_\d+px_[^\]]+\]/g, 'shadow-md border border-white/5');
            content = content.replace(/hover:shadow-\[0_0_\d+px_[^\]]+\]/g, 'hover:shadow-lg hover:border-white/10');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Toned down UI slop (shadows) in ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
