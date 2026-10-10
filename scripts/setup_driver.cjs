const https = require('https');
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const destDir = 'C:\\Users\\imris\\AppData\\Local\\ms-playwright-go\\1.57.0';
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

// 1. Copy node.exe
const nodeExe = process.execPath;
fs.copyFileSync(nodeExe, path.join(destDir, 'node.exe'));
console.log('Copied node.exe to', destDir);

// 2. Download playwright-core-1.57.0.tgz
const tgzUrl = 'https://registry.npmjs.org/playwright-core/-/playwright-core-1.57.0.tgz';
const tgzPath = path.join(destDir, 'playwright-core.tgz');

const file = fs.createWriteStream(tgzPath);
https.get(tgzUrl, (res) => {
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Downloaded playwright-core 1.57.0');
    // Extract into destDir
    execSync(`tar -zxvf "${tgzPath}" -C "${destDir}"`);
    fs.unlinkSync(tgzPath);
    console.log('Extracted package into', destDir);
    
    // Test running --version
    const out = execSync(`"${path.join(destDir, 'node.exe')}" "${path.join(destDir, 'package', 'cli.js')}" --version`);
    console.log('Driver output version:', out.toString());
  });
}).on('error', console.error);
