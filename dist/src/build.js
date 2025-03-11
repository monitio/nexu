"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProject = buildProject;
const child_process_1 = require("child_process");
function buildProject() {
    // Spawns a child process to run the 'npm run build' command.
    const build = (0, child_process_1.spawn)('npm', ['run', 'build'], { shell: true, stdio: 'inherit' });
    build.on('error', (error) => {
        console.error('Error starting build process:', error);
    });
    build.on('close', (code) => {
        if (code === 0) {
            console.log('Build completed successfully.');
        }
        else {
            console.error(`Build failed with exit code ${code}`);
        }
    });
}
