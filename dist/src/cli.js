#!/usr/bin/env node
import { Command } from "commander";
import pkg from "../package.json";
const v = pkg.version;
const n = pkg.name;
const d = pkg.description;
const program = new Command();
program.name(n).description(d).version(v);
program
    .command('new')
    .description('Creates a new project using Webbed.')
    .action(() => {
    console.log('Creating a new project using Webbed...');
});
program
    .command('test-cli')
    .description('An example command to demonstrate functionality')
    .action(() => {
    console.log('Running the example command...');
    console.log('Hello, World!');
});
program.parse(process.argv);
