import { google } from 'googleapis';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/auth/callback'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: ['https://www.googleapis.com/auth/calendar'],
});

console.log('\n======================================');
console.log('1. Open this URL in your browser:');
console.log(authUrl);
console.log('======================================\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('2. Paste the redirected code (or full URL) here: ', async (input) => {
  try {
    const code = input.includes('code=')
      ? decodeURIComponent(input.split('code=')[1].split('&')[0])
      : input.trim();

    const { tokens } = await oauth2Client.getToken(code);
    console.log('\n--- SUCCESS! COPY THIS INTO YOUR .env.local ---');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('-----------------------------------------------\n');
  } catch (err) {
    console.error('Error getting token:', err.message);
  }
  rl.close();
});
