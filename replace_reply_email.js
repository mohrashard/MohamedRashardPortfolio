const fs = require('fs');
const path = require('path');
const srcDir = path.join('c:\\Projects\\MohamedRashardPortfolio\\src\\app\\api');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content.replace(/'mohrashard@gmail\.com'/g, 'process.env.NEXT_PUBLIC_REPLY_TO_EMAIL');
            newContent = newContent.replace(/"mohrashard@gmail\.com"/g, 'process.env.NEXT_PUBLIC_REPLY_TO_EMAIL');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}
processDir(srcDir);
