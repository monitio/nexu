import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

export function createTemplate(projectName: string) {
  const projectDir = join(process.cwd(), projectName);
  try {
    // Create the new project directory.
    mkdirSync(projectDir);
    console.log(`Created directory: ${projectDir}`);

    // Run "npm init -y" in the new directory.
    const npmInit = spawn('npm', ['init', '-y'], {
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
      const pkgPath = join(projectDir, 'package.json');
      const pkgData = JSON.parse(readFileSync(pkgPath, 'utf8'));
      pkgData.name = projectName;
      writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2), 'utf8');
      console.log(`Updated package.json with project name: ${projectName}`);

      // Optionally, install your framework package as a dependency.
      // Replace 'my-framework' with the actual package name if different.
      const npmInstall = spawn('npm', ['install', 'webbed'], {
        cwd: projectDir,
        shell: true,
        stdio: 'inherit'
      });

      npmInstall.on('close', (installCode) => {
        if (installCode === 0) {
          console.log('Installed my-framework dependency.');
        } else {
          console.error(`npm install failed with exit code ${installCode}`);
        }
      });
    });
  } catch (error) {
    console.error('Error creating project:', error);
  }
}
