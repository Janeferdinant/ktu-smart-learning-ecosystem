const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const secretPatterns = [
  { name: 'GitHub Token', regex: /ghp_[a-zA-Z0-9]{20,}|github_pat_[a-zA-Z0-9]{20,}/ },
  { name: 'Generic Private Key', regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'AWS Access Key', regex: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'Google API Key', regex: /\bAIza[0-9A-Za-z-_]{35}\b/ },
  { name: 'OpenAI Secret', regex: /\bsk-[a-zA-Z0-9]{20,}\b/ },
  { name: 'Vercel Token', regex: /\bvercel_[a-zA-Z0-9]{20,}\b/i },
  { name: 'Hardcoded Password Field', regex: /(?:password|passwd|secret|api_key|apikey)\s*[:=]\s*["'][^"']{6,}["']/i },
  { name: 'Phone Number (Indian 10-digit)', regex: /\b(?:\+91[\-\s]?)?[6-9]\d{9}\b/ }
];

const ignoredDirs = new Set(['node_modules', '.git', 'dist', '.vercel']);

let findings = [];

function scanDir(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (ignoredDirs.has(item.name)) continue;
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      scanDir(fullPath);
    } else {
      if (item.name.match(/\.(ts|tsx|js|jsx|json|md|html|css|txt|env|yml|yaml|csv)$/i)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          for (const sp of secretPatterns) {
            const matches = content.match(new RegExp(sp.regex, 'g'));
            if (matches) {
              for (const m of matches) {
                // Ignore innocuous false positives like sample schemas or package.json
                if (m.includes('password') && (fullPath.includes('package-lock.json') || fullPath.includes('schema'))) continue;
                findings.push({
                  file: path.relative(rootDir, fullPath),
                  pattern: sp.name,
                  snippet: m.substring(0, 40)
                });
              }
            }
          }
        } catch (e) {}
      }
    }
  }
}

scanDir(rootDir);

console.log('--- SECURITY AUDIT REPORT ---');
if (findings.length === 0) {
  console.log('STATUS: CLEAN. No security tokens, credentials, private keys, or sensitive personal data found.');
} else {
  console.log(`STATUS: Found ${findings.length} potential matches:`);
  findings.forEach(f => {
    console.log(`- [${f.pattern}] in ${f.file}: ${f.snippet}`);
  });
}
