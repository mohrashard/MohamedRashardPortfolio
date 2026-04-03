import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'public/posts');

export function getSortedPostsData() {
    // Get file names under /public/posts
    const fileNames = fs.readdirSync(postsDirectory);
    // Get data from each file
    const allPostsData = fileNames
        .filter(fileName => /\.md$/i.test(fileName))
        .map((fileName) => {
            // Remove ".md" from file name to get id
            const id = fileName.replace(/\.md$/i, '');

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            // Normalize Date: gray-matter might parse it as a Date object or string
            // We want to ensure it's a string for consistent handling if needed,
            // or just ensure we can sort it.
            let date = matterResult.data.date;
            if (date instanceof Date) {
                date = date.toISOString();
            }

            // Combine the data with the id
            return {
                id,
                ...matterResult.data,
                date: date || '2000-01-01', // Fallback for sorting
            };
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (new Date(a.date) < new Date(b.date)) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.filter(fileName => fileName.endsWith('.md')).map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
        id,
        contentHtml: matterResult.content,
        ...matterResult.data,
    };
}
