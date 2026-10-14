const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');

function getSha256(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

const ignored = new Set(['node_modules', '.git', 'dist', '.vercel']);

let allFiles = [];

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (ignored.has(item.name)) continue;
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      walk(fullPath);
    } else {
      const stats = fs.statSync(fullPath);
      const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
      allFiles.push({
        path: relPath,
        filename: item.name,
        ext: path.extname(item.name).toLowerCase(),
        sizeBytes: stats.size,
        modified: stats.mtime.toISOString(),
        sha256: getSha256(fullPath)
      });
    }
  }
}

walk(rootDir);

// Generate CSV
const csvHeader = 'Index,Filename,RelativePath,Extension,SizeBytes,ModifiedTime,SHA256\n';
const csvRows = allFiles.map((f, i) => 
  `${i + 1},"${f.filename.replace(/"/g, '""')}","${f.path}","${f.ext}",${f.sizeBytes},"${f.modified}","${f.sha256}"`
).join('\n');

fs.writeFileSync(path.join(rootDir, 'audit-reports', 'file-inventory.csv'), csvHeader + csvRows, 'utf8');

// Generate resource-index.json
const resourceIndex = {
  metadata: {
    generatedAt: new Date().toISOString(),
    totalFilesIndexed: allFiles.length,
    institution: "APJ Abdul Kalam Technological University (KTU)",
    department: "Department of Computer Science and Engineering (CSE)",
    faculty: "Jane Rose Ferdinant | Assistant Professor",
    license: "CC BY-NC-ND 4.0 (Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International)",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
  },
  inventory: allFiles
};

fs.writeFileSync(path.join(rootDir, 'resource-index.json'), JSON.stringify(resourceIndex, null, 2), 'utf8');

console.log(`Re-indexed ${allFiles.length} files successfully into audit-reports/file-inventory.csv and resource-index.json`);
