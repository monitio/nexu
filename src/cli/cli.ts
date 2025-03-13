#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import pkg from "../../package.json";
import { startDevServer } from "../server";

const v = pkg.version;
const n = pkg.name;
const d = pkg.description;

const program = new Command();
const TEMPLATE_DIR = path.join(__dirname, "../../template");

program.name(n).description(d).version(v);

program
  .command("create <project-name>")
  .description("Create a new Webbed project")
  .action((projectName) => {
    const targetDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
      console.log(chalk.red(`Error: Directory ${projectName} already exists!`));
      process.exit(1);
    }

    console.log(chalk.green(`Creating project: ${projectName}...`));

    fs.mkdirSync(targetDir, { recursive: true });

    copyDir(TEMPLATE_DIR, targetDir);

    // Detect package manager
    const packageManager = detectPackageManager();
    console.log(chalk.blue(`Installing dependencies with ${packageManager}...`));

    execSync(`${packageManager} install`, { cwd: targetDir, stdio: "inherit" });

    console.log(chalk.green(`Project ${projectName} created successfully!`));
    console.log(chalk.yellow(`Run the following to start your project:`));
    console.log(chalk.cyan(`cd ${projectName} && webbed dev`));
    process.exit(0);
  });

program
  .command("dev")
  .description("Start the Webbed development server")
  .action(() => {
    console.log(chalk.green("🚀 Starting the Webbed Development Server..."));

    // Start the development server with live-reload
    startDevServer();
  });

program.parse(process.argv);

// Helper function to copy template files
function copyDir(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.statSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}

// 🔍 Detect package manager based on project setup
function detectPackageManager(): string {
  const projectDir = process.cwd();

  if (fs.existsSync(path.join(projectDir, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(projectDir, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(projectDir, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(projectDir, "package-lock.json"))) return "npm";

  console.log(chalk.yellow("⚠️ No lockfile detected. Defaulting to npm."));
  return "npm"; // Default to npm if no lockfile is found
}
