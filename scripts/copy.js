const fs = require("fs");
const path = require("path");

// Ensure dist directory exists
const distPath = "dist";
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
}

// Function to copy files
function copyFile(src, dest) {
    fs.copyFileSync(src, dest);
    console.log(`✔ Copied ${src} to ${dest}`);
}

// Function to copy directories, **excluding node_modules and package-lock.json**
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    fs.readdirSync(src).forEach((file) => {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);

        // Exclude "node_modules" and "package-lock.json"
        if (file === "node_modules" || file === "package-lock.json") {
            console.log(`⏩ Skipping ${srcFile}`);
            return;
        }

        if (fs.lstatSync(srcFile).isDirectory()) {
            copyDir(srcFile, destFile); // Recursively copy directories
        } else {
            fs.copyFileSync(srcFile, destFile);
        }
    });

    console.log(`✔ Copied ${src} to ${dest} (excluding node_modules and package-lock.json)`);
}

// Copy individual files
copyFile("README.md", path.join(distPath, "README.md"));
copyFile("package.json", path.join(distPath, "package.json"));

// Copy template folder while excluding unwanted files
copyDir("template", path.join(distPath, "template"));

console.log("✅ All files copied successfully!");
