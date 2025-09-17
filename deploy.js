const fs = require('fs');
const path = require('path');

// Copy files from dist to root for GitHub Pages deployment
const distDir = './dist';
const rootDir = './';

// Files to copy from dist to root
const filesToCopy = [
  'index.html',
  'vite.svg',
  'CNAME'
];

// Copy assets folder
const assetsDir = path.join(distDir, 'assets');
const rootAssetsDir = path.join(rootDir, 'assets');

// Create assets directory in root if it doesn't exist
if (!fs.existsSync(rootAssetsDir)) {
  fs.mkdirSync(rootAssetsDir, { recursive: true });
}

// Copy all files from dist/assets to root/assets
if (fs.existsSync(assetsDir)) {
  const assetFiles = fs.readdirSync(assetsDir);
  assetFiles.forEach(file => {
    const srcPath = path.join(assetsDir, file);
    const destPath = path.join(rootAssetsDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to root/assets/`);
  });
}

// Copy individual files
filesToCopy.forEach(file => {
  const srcPath = path.join(distDir, file);
  const destPath = path.join(rootDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to root/`);
  } else {
    console.log(`Warning: ${file} not found in dist/`);
  }
});

console.log('Deployment files copied to root successfully!');
