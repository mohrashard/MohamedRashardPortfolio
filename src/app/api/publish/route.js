import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { createClient } from '@/utils/supabase/server';

export async function POST(request) {
    try {
        // Protect API route via Supabase SSR
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { slug, markdown, imageBase64 } = await request.json();

        if (!slug || !markdown) {
            return NextResponse.json({ error: "Missing slug or markdown" }, { status: 400 });
        }

        // Sanitize em-dashes and en-dashes from markdown before publishing
        markdown = markdown.replace(/\s*—\s*/g, ' - ').replace(/\s*–\s*/g, ' - ');

        // Automated Validation Check: Ensure Node 2 successfully injected the JSON-LD FAQ schema
        if (!markdown.includes('<script type="application/ld+json">') || !markdown.includes('FAQPage')) {
            return NextResponse.json({ 
                error: "Validation Failed: The AI drafter failed to inject the JSON-LD FAQPage schema. Please run the AI Drafter again or manually append the schema script block at the bottom of the editor." 
            }, { status: 400 });
        }

        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;
        const token = process.env.GITHUB_PAT;

        if (!owner || !repo || !token) {
            return NextResponse.json({ 
                error: "GitHub environment variables (GITHUB_OWNER, GITHUB_REPO, GITHUB_PAT) not configured in .env.local" 
            }, { status: 500 });
        }

        const octokit = new Octokit({ auth: token });

        // 1. Get the current commit object
        const { data: refData } = await octokit.rest.git.getRef({
            owner,
            repo,
            ref: 'heads/main'
        });
        const commitSha = refData.object.sha;

        const { data: commitData } = await octokit.rest.git.getCommit({
            owner,
            repo,
            commit_sha: commitSha
        });
        const treeSha = commitData.tree.sha;

        // 2. Create the Markdown blob
        const { data: mdBlob } = await octokit.rest.git.createBlob({
            owner,
            repo,
            content: markdown,
            encoding: 'utf-8'
        });

        const newTree = [
            {
                path: `public/posts/${slug}.md`,
                mode: '100644',
                type: 'blob',
                sha: mdBlob.sha
            }
        ];

        // 3. Create the Image blob (if provided)
        if (imageBase64) {
            // Strip the data URI prefix (e.g., data:image/png;base64,)
            const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
            const { data: imgBlob } = await octokit.rest.git.createBlob({
                owner,
                repo,
                content: base64Data,
                encoding: 'base64'
            });

            newTree.push({
                path: `public/posts/${slug}.png`,
                mode: '100644',
                type: 'blob',
                sha: imgBlob.sha
            });
        }

        // 4. Create a new tree
        const { data: newTreeData } = await octokit.rest.git.createTree({
            owner,
            repo,
            base_tree: treeSha,
            tree: newTree
        });

        // 5. Create a new commit
        const { data: newCommitData } = await octokit.rest.git.createCommit({
            owner,
            repo,
            message: `feat(content): Publish ${slug} via AI Admin UI`,
            tree: newTreeData.sha,
            parents: [commitSha]
        });

        // 6. Update the reference
        await octokit.rest.git.updateRef({
            owner,
            repo,
            ref: 'heads/main',
            sha: newCommitData.sha
        });

        return NextResponse.json({ success: true, commit_sha: newCommitData.sha });
        
    } catch (error) {
        console.error("GitOps publish error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
