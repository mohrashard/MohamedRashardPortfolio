const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'public/posts');

function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.filter(fileName => fileName.endsWith('.md')).map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        return {
            id,
            ...matterResult.data,
        };
    });

    return allPostsData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA < dateB) {
            return 1;
        } else {
            return -1;
        }
    });
}

const posts = getSortedPostsData();
const output = posts.map(p => `${p.id} | ${p.date}`).join('\n');
fs.writeFileSync('C:/Projects/MohamedRashardPortfolio/tmp/posts_list.txt', output);
