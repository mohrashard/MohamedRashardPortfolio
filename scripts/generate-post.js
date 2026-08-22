import fs from 'fs';
import path from 'path';
import { generateEditorialBrief, generateTechnicalDraft } from '../src/lib/contentEngine.js';

async function main() {
    try {
        // Read raw-input.txt from the root directory
        const inputPath = path.resolve(process.cwd(), 'raw-input.txt');
        
        if (!fs.existsSync(inputPath)) {
            console.error(`🚨 Error: Could not find 'raw-input.txt' at ${inputPath}`);
            console.error(`Please create 'raw-input.txt' in your project root with the technical problem.`);
            process.exit(1);
        }

        const rawInput = fs.readFileSync(inputPath, 'utf8');
        
        console.log("🧠 Node 1: Strategist is analyzing the input...");
        const result = await generateEditorialBrief(rawInput);
        
        if (result.status === 'rejected') {
            console.log(`❌ Input Rejected: ${result.reason || 'Did not meet intent criteria.'}`);
            process.exit(0);
        }
        
        const brief = result.brief;
        console.log(`✅ Approved! Brief generated for: "${brief.target_keyword}"`);
        console.log("✍️ Node 2: Technical Drafter is writing the post...");
        
        const markdown = await generateTechnicalDraft(brief);
        
        const slug = brief.proposed_slug || 'untitled-post';
        // Ensure it saves to public/posts/
        const outputPath = path.resolve(process.cwd(), 'public', 'posts', `${slug}.md`);
        
        fs.writeFileSync(outputPath, markdown, 'utf8');
        console.log(`\n🎉 Success! Markdown post created at: ${outputPath}`);
        
        // Handle Image Placeholder
        const imagePath = path.resolve(process.cwd(), 'public', 'posts', `${slug}.png`);
        const defaultImagePath = path.resolve(process.cwd(), 'public', 'default-cover.png');
        
        if (!fs.existsSync(imagePath)) {
            if (fs.existsSync(defaultImagePath)) {
                fs.copyFileSync(defaultImagePath, imagePath);
                console.log(`🖼️ Placeholder image copied to: ${imagePath}`);
            } else {
                console.warn(`⚠️ Warning: Default cover image not found at ${defaultImagePath}. Could not create placeholder image.`);
            }
        } else {
            console.log(`🖼️ Image already exists at: ${imagePath}`);
        }

    } catch (error) {
        console.error("🚨 Pipeline failed:", error);
        process.exit(1);
    }
}

main();
