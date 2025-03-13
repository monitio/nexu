#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const package_json_1 = __importDefault(require("../../package.json"));
const v = package_json_1.default.version;
const n = package_json_1.default.name;
const d = package_json_1.default.description;
const program = new commander_1.Command();
const TEMPLATE_DIR = path_1.default.join(__dirname, "../../template");
program
    .name(n)
    .description(d)
    .version(v);
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
    console.log(chalk_1.default.blue(`Installing dependencies...`));
    (0, child_process_1.execSync)("npm install", { cwd: targetDir, stdio: "inherit" });
    console.log(chalk_1.default.green(`Project ${projectName} created successfully!`));
    console.log(chalk_1.default.yellow(`Run the following to start your project:`));
    console.log(chalk_1.default.cyan(`cd ${projectName} && npm run dev`));
});
program
    .command("dev")
    .description("Start the Webbed development server")
    .action(() => {
    Promise.resolve().then(() => __importStar(require("../server"))).then((server) => server.startServer());
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
