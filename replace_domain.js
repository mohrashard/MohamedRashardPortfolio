const fs = require('fs');
const path = require('path');
const srcDir = path.join('c:\\Projects\\MohamedRashardPortfolio\\src');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content.replace(/https:\/\/www\.mohamedrashard\.dev/g, 'https://mr2labs.com');
            
            // Just in case any are without www or https
            newContent = newContent.replace(/www\.mohamedrashard\.dev/g, 'mr2labs.com');
            newContent = newContent.replace(/mohamedrashard\.dev/g, 'mr2labs.com');
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}
processDir(srcDir);
