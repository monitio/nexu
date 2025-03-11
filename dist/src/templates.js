"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplate = createTemplate;
const fs_1 = require("fs");
const path_1 = require("path");
const child_process_1 = require("child_process");
function createTemplate(projectName) {
    const projectDir = (0, path_1.join)(process.cwd(), projectName);
    try {
        // Create the new project directory.
        (0, fs_1.mkdirSync)(projectDir);
        console.log(`Created directory: ${projectDir}`);
        // Run "npm init -y" in the new directory.
        const npmInit = (0, child_process_1.spawn)('npm', ['init', '-y'], {
            cwd: projectDir,
            shell: true,
            stdio: 'inherit'
        });
        npmInit.on('close', (code) => {
            if (code !== 0) {
                console.error(`npm init failed with exit code ${code}`);
                return;
            }
            console.log('Initialized npm project.');
            // Read, update, and rewrite package.json with the proper project name.
            const pkgPath = (0, path_1.join)(projectDir, 'package.json');
            const pkgData = JSON.parse((0, fs_1.readFileSync)(pkgPath, 'utf8'));
            pkgData.name = projectName;
            (0, fs_1.writeFileSync)(pkgPath, JSON.stringify(pkgData, null, 2), 'utf8');
            console.log(`Updated package.json with project name: ${projectName}`);
            // Optionally, install your framework package as a dependency.
            // Replace 'my-framework' with the actual package name if different.
            const npmInstall = (0, child_process_1.spawn)('npm', ['install', 'webbed'], {
                cwd: projectDir,
                shell: true,
                stdio: 'inherit'
            });
            npmInstall.on('close', (installCode) => {
                if (installCode === 0) {
                    console.log('Installed my-framework dependency.');
                }
                else {
                    console.error(`npm install failed with exit code ${installCode}`);
                }
            });
        });
    }
    catch (error) {
        console.error('Error creating project:', error);
    }
}
