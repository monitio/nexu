#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = __importDefault(require("../package.json"));
const v = package_json_1.default.version;
const n = package_json_1.default.name;
const d = package_json_1.default.description;
const program = new commander_1.Command();
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
