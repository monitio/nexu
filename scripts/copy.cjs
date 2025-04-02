const fs = require('fs');
const path = require('path');

// Source file path
const sourcePath = path.join(__dirname, '..', 'README.md');
// Destination file path
const destinationPath = path.join(__dirname, '..', 'dist', 'README.md');

// Function to copy the file
function copyReadme() {
  fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) {
      console.error('Error copying README.md:', err);
    } else {
      console.log('README.md copied successfully to dist folder.');
    }
  });
}

 // Execute the copy function
 copyReadme();
