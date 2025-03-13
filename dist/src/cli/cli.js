#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const package_json_1 = __importDefault(require("../../package.json"));
const server_1 = require("../server");
const v = package_json_1.default.version;
const n = package_json_1.default.name;
const d = package_json_1.default.description;
const program = new commander_1.Command();
const TEMPLATE_DIR = path_1.default.join(__dirname, "../../template");
program.name(n).description(d).version(v);
program
    .command("create <project-name>")
    .description("Create a new Webbed project")
    .action((projectName) => {
    const targetDir = path_1.default.join(process.cwd(), projectName);
    if (fs_1.default.existsSync(targetDir)) {
        console.log(chalk_1.default.red(`Error: Directory ${projectName} already exists!`));
        process.exit(1);
    }
    console.log(chalk_1.default.green(`Creating project: ${projectName}...`));
    fs_1.default.mkdirSync(targetDir, { recursive: true });
    copyDir(TEMPLATE_DIR, targetDir);
    // Detect package manager
    const packageManager = detectPackageManager();
    console.log(chalk_1.default.blue(`Installing dependencies with ${packageManager}...`));
    (0, child_process_1.execSync)(`${packageManager} install`, { cwd: targetDir, stdio: "inherit" });
    console.log(chalk_1.default.green(`Project ${projectName} created successfully!`));
    console.log(chalk_1.default.yellow(`Run the following to start your project:`));
    console.log(chalk_1.default.cyan(`cd ${projectName} && webbed dev`));
    process.exit(0);
});
program
    .command("dev")
    .description("Start the Webbed development server")
    .action(() => {
    console.log(chalk_1.default.green("🚀 Starting the Webbed Development Server..."));
    // Start the development server with live-reload
    (0, server_1.startDevServer)();
});
program.parse(process.argv);
// Helper function to copy template files
function copyDir(src, dest) {
    if (!fs_1.default.existsSync(dest)) {
        fs_1.default.mkdirSync(dest, { recursive: true });
    }
    for (const file of fs_1.default.readdirSync(src)) {
        const srcFile = path_1.default.join(src, file);
        const destFile = path_1.default.join(dest, file);
        if (fs_1.default.statSync(srcFile).isDirectory()) {
            copyDir(srcFile, destFile);
        }
        else {
            fs_1.default.copyFileSync(srcFile, destFile);
        }
    }
}
// 🔍 Detect package manager based on project setup
function detectPackageManager() {
    const projectDir = process.cwd();
    if (fs_1.default.existsSync(path_1.default.join(projectDir, "pnpm-lock.yaml")))
        return "pnpm";
    if (fs_1.default.existsSync(path_1.default.join(projectDir, "yarn.lock")))
        return "yarn";
    if (fs_1.default.existsSync(path_1.default.join(projectDir, "bun.lockb")))
        return "bun";
    if (fs_1.default.existsSync(path_1.default.join(projectDir, "package-lock.json")))
        return "npm";
    console.log(chalk_1.default.yellow("⚠️ No lockfile detected. Defaulting to npm."));
    return "npm"; // Default to npm if no lockfile is found
}
