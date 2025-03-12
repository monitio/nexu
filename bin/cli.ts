#!/usr/bin/env node
import { Command } from 'commander';
import { createTemplate } from '../src/web/templates';
import { runServer } from '../src/web/server';

import pkg from '../package.json';

const program = new Command();

program.version(pkg.version);

program
  .command('create <project-name>')
  .description('Makes a new project using the framework.')
  .action((projectName: string) => {
    console.log('Creating project...');
    createTemplate(projectName);
  });

program
  .command('run')
  .description('Run the framework server.')
  .action(() => {
    console.log('Starting server...');
    runServer();
  });

program.parse(process.argv);
