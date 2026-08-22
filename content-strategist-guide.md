# 0 to 1 Architecture: Human-in-the-Loop Content Engine

Since free AI output can sometimes be unreliable ("slop"), a fully autonomous system is risky for your brand. The optimal approach is a **Human-in-the-Loop (HITL) GitOps Architecture**. 

In this system, AI handles the tedious discovery and structuring, but **you** maintain complete editorial control over the final draft and deployment directly from your Admin Dashboard.

---

## 🏗️ The 0 to 1 System Architecture

### Phase 1: Discovery & Ranking (The AI Scout)
*This happens automatically in the background.*
1. **Scraping**: A background script (cron job or webhooks) pulls raw questions from Reddit/HN.
2. **Node 1 (The Strategist)**: Groq (Llama-3) evaluates each question using the 4-factor Intent Scoring Matrix.
3. **Database Storage**: The raw question, the score, and the generated Editorial Brief (Title, H2 headers, core problem) are saved into a Supabase table called `content_ideas`.

### Phase 2: The Admin Dashboard (Human Curation & Drafting)
*This is where you log in and take control.*
1. **Idea Triage**: You view a dashboard table of ideas, ranked by their AI score. 
2. **The Editor**: You select a high-scoring idea and open the Draft interface.
3. **Node 2 (On-Demand Drafter)**: 
   - You can click a button: `"Generate Draft with AI"`. This triggers Gemini to write the initial Markdown based on the brief.
   - **Crucially**: The output populates a Markdown text area on your screen. It is *not* published yet.
4. **Human Editing**: You manually edit the Markdown, fix any AI slop, add your own code snippets, and refine the tone.
5. **Image Upload**: You use a file input field to select a hero image from your local computer.

### Phase 3: The GitOps Deployment (Push to Vercel)
*This replaces the need for a Headless CMS.*
1. **The Publish Action**: You hit `"Publish to Production"`.
2. **The API Route**: Your Next.js backend receives the finalized Markdown string and the Image file.
3. **GitHub API (Octokit)**: 
   - The backend uses a GitHub Personal Access Token to talk directly to your repo.
   - It commits the uploaded image to `public/posts/image.png`.
   - It commits the Markdown text to `public/posts/slug.md`.
4. **Vercel Magic**: GitHub receives the commit. Vercel automatically detects the push to the `main` branch and triggers a production build. 3 minutes later, your post is live.

---

## 🛠️ Step-by-Step Implementation Guide

### 1. Database Setup (Supabase)
Create a table `content_ideas` to store the output of Node 1:
- `id` (uuid)
- `raw_source` (text - the original reddit post)
- `intent_score` (int - out of 40)
- `editorial_brief` (jsonb - title, slug, h2s)
- `status` (text - 'pending', 'drafted', 'published')

### 2. The Admin UI (Next.js)
Build a simple protected route `/admin/content`:
- A table fetching `content_ideas` where `status = 'pending'`.
- A dynamic page `/admin/content/[id]` with:
  - The brief details.
  - A massive `<textarea>` for the Markdown.
  - A `<input type="file" accept="image/*" />` for the cover image.
  - A `"Generate AI Draft"` button (calls Node 2).
  - A `"Publish"` button.

### 3. The GitHub Publisher API (`/api/publish-post`)
This is the magic piece. You will use the `octokit` npm package to commit files to GitHub from your server.

**Example Logic:**
\`\`\`javascript
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

// 1. Get the latest commit SHA of your main branch
// 2. Upload the Image as a blob to GitHub
// 3. Upload the Markdown string as a blob to GitHub
// 4. Create a new Tree pointing to public/posts/image.png and public/posts/slug.md
// 5. Create a Commit pointing to the new Tree
// 6. Update the main branch reference to point to the new Commit
\`\`\`
*(This bypasses local file system limits on Vercel and directly updates your source code).*

### 4. Adjusting the Node 1 Script
Modify the `scripts/autonomous-content-engine.mjs` script I gave you earlier:
- Remove the Node 2 (Gemini) section and the file-writing section.
- Instead, have it take the output of `generateEditorialBrief()` and run an `INSERT` into your Supabase `content_ideas` table.
- Set this script up as a Cron Job on a free service like Render, or hook it to an Apify actor that runs daily.
