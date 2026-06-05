const fs = require('fs');
const path = require('path');
const apiDir = path.join('c:\\Projects\\MohamedRashardPortfolio\\src\\app\\api');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;

            // Replace exact matches
            newContent = newContent.replace(/from:\s*'Mohamed \| Mr² Labs <labs@mohamedrashard\.dev>',?/g, 'from: process.env.RESEND_FROM_EMAIL,');
            newContent = newContent.replace(/from:\s*'Mr² Labs Bot <labs@mohamedrashard\.dev>',?/g, 'from: process.env.RESEND_FROM_EMAIL,');
            
            // Just in case unicode failed, let's also do a general replace:
            newContent = newContent.replace(/from:\s*'[^']*labs@mohamedrashard\.dev',?/g, 'from: process.env.RESEND_FROM_EMAIL,');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}
processDir(apiDir);
