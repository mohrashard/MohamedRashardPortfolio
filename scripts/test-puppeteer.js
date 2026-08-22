import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

async function run() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });
        const page = await browser.newPage();
        await page.goto('https://old.reddit.com/r/SaaS/top/?sort=top&t=week', { waitUntil: 'domcontentloaded' });
        
        // Wait a bit just in case
        await new Promise(r => setTimeout(r, 2000));
        
        const html = await page.evaluate(() => {
            const things = document.querySelectorAll('.thing');
            if (things.length > 0) {
                return `Got ${things.length} posts! First: ${things[0].querySelector('a.title')?.innerText}`;
            }
            return document.body.innerText.substring(0, 500);
        });
        console.log('Result:', html);
        await browser.close();
    } catch(e) {
        console.error(e);
    }
}
run();
