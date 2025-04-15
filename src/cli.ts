#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { Command } from "commander";

import * as path from 'path';
import * as fs from 'fs-extra';

// alternative to:
// import pkg from "../package.json";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const v = pkg.version;
const n = "nexu";
const d = pkg.description;

const program = new Command();

program.name(n).description(d).version(v);

// Function to handle the creation logic
function createApp(projectName?: string) {
  const defaultProjectName = 'my-nexu-app';
  const appName = projectName || defaultProjectName;

  // Correctly reference the template folder
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(__dirname, '..', 'template');
  const appPath = path.join(process.cwd(), appName);

  fs.copy(templatePath, appPath)
    .then(() => {
      console.log(`Successfully created Nexu app "${appName}"`);
    })
    .catch((err) => {
      console.error('Error creating Nexu app:', err);
    });
}

program
  .command('create')
  .description('Create a new Nexu app.')
  .argument('[projectName]', 'Name of the project')
  .action((projectName) => {
    createApp(projectName);
  }
);

program
  .command('new')
  .description('Create a new Nexu app.')
  .argument('[projectName]', 'Name of the project')
  .action((projectName) => {
    createApp(projectName);
  }
);

program
  .command('test')
  .description('An example command to test.')
  .action(() => {
    console.log('Running the example command...');
    console.log('Hello, World!');
  }
);

program.parse(process.argv);
