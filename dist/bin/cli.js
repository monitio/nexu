#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const templates_1 = require("../src/web/templates");
const server_1 = require("../src/web/server");
const package_json_1 = __importDefault(require("../package.json"));
const program = new commander_1.Command();
program.version(package_json_1.default.version);
program
    .command('create <project-name>')
    .description('Makes a new project using the framework.')
    .action((projectName) => {
    console.log('Creating project...');
    (0, templates_1.createTemplate)(projectName);
});
program
    .command('run')
    .description('Run the framework server.')
    .action(() => {
    console.log('Starting server...');
    (0, server_1.runServer)();
});
program.parse(process.argv);
