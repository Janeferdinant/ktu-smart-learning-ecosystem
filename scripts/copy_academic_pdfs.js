const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'dashboard', 'public', 'academic-resources');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function copyPdfs(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (['node_modules', '.git', 'dist', '.vercel', 'dashboard'].includes(item.name)) continue;
    if (item.isDirectory()) {
      copyPdfs(fullPath);
    } else if (item.name.toLowerCase().endsWith('.pdf')) {
      // Exclude huge 38MB / 22MB textbooks from direct web bundle to keep upload speedy,
      // but include all question papers, schemes, notes, labs, and module guides
      if (item.name.includes('Mastering STM32') || item.name.includes('AI Guide Textbook') || item.name.includes('AI Textbook') || item.name.includes('WA0025')) {
        console.log(`Skipping large reference book from public bundle: ${item.name}`);
        continue;
      }
      const destPath = path.join(publicDir, item.name);
      fs.copyFileSync(fullPath, destPath);
      console.log(`Copied to public: ${item.name} (${(fs.statSync(destPath).size / 1024).toFixed(1)} KB)`);
    }
  }
}

copyPdfs(rootDir);
console.log('Finished copying academic PDFs to dashboard/public/academic-resources/');
