const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src/app/api');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file === 'route.js' || file === 'route.ts') {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Regex to find: await supabase.from('leads').insert([ ... ]);
            // We want to replace it with: const { error: dbError } = await supabase.from('leads').insert([ ... ]);
            // and then if (dbError) return NextResponse.json({ error: 'Database insertion failed' }, { status: 500 });
            
            // Because there might be multiline inserts, we can do a regex that captures the entire await statement
            // Or simpler, just replace "await supabase.from('leads').insert" with "const { error: dbError } = await supabase.from('leads').insert"
            
            if (content.includes("await supabase.from('leads').insert") && !content.includes("const { error: dbError } = await supabase.from('leads').insert")) {
                // Split the content by the keyword
                const parts = content.split("await supabase.from('leads').insert");
                let newContent = parts[0];
                for (let i = 1; i < parts.length; i++) {
                    const part = parts[i];
                    // We need to find the end of this statement. Usually it ends with `}]);` or `}]);\n`
                    // Let's just find the first semicolon after this, but there could be nested brackets.
                    // Instead, let's just do a string replacement of the exact string:
                    
                    // Actually, a simpler approach:
                    // Just replace "await supabase.from('leads').insert" with "const { error: dbError } = await supabase.from('leads').insert"
                    // And append the error checking code right after the semicolon that ends the insert.
                }
            }
        }
    }
}

// Better script approach:
function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Look for `await supabase.from('leads').insert([...]);`
    // We can use a regex to match the full statement up to the semicolon.
    const regex = /([ \t]*)await supabase\.from\('leads'\)\.insert\(\[\s*\{([\s\S]*?)\}\s*\]\);/g;
    
    const newContent = content.replace(regex, (match, indent, inner) => {
        return `${indent}const { error: dbError } = await supabase.from('leads').insert([{${inner}}]);\n${indent}if (dbError) {\n${indent}  console.error('[SUPABASE ERROR]:', dbError.message);\n${indent}  return NextResponse.json({ error: 'Failed to record lead in database' }, { status: 500 });\n${indent}}`;
    });
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Fixed ${filePath}`);
    }
}

function processAll(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processAll(fullPath);
        } else if (file === 'route.js' || file === 'route.ts') {
            fixFile(fullPath);
        }
    }
}

processAll(apiDir);
