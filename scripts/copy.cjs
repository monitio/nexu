const fs = require('fs');
const path = require('path');

// Source file path for README.md
const sourceReadmePath = path.join(__dirname, '..', 'README.md');
// Destination file path for README.md
const destinationReadmePath = path.join(__dirname, '..', 'dist', 'README.md');

// Function to copy the README.md file
function copyReadme() {
  fs.copyFile(sourceReadmePath, destinationReadmePath, (err) => {
    if (err) {
      console.error('Error copying README.md:', err);
    } else {
      console.log('README.md copied successfully to dist folder.');
    }
  });
}

// Source and destination paths for the template folder
const sourceTemplatePath = path.join(__dirname, '..', 'template');
const destinationTemplatePath = path.join(__dirname, '..', 'dist', 'template');

// Function to copy the template folder recursively
function copyTemplate() {
  fs.cp(sourceTemplatePath, destinationTemplatePath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error copying template folder:', err);
    } else {
      console.log('Template folder copied successfully to dist folder.');
    }
  });
}

// Execute the copy functions
copyReadme();
copyTemplate();
