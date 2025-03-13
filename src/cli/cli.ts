#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import pkg from "../../package.json";

const v = pkg.version;
const n = pkg.name;
const d = pkg.description;

const program = new Command();
const TEMPLATE_DIR = path.join(__dirname, "../../template");

program
  .name(n)
  .description(d)
  .version(v);

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

    console.log(chalk.blue(`Installing dependencies...`));
    execSync("npm install", { cwd: targetDir, stdio: "inherit" });

    console.log(chalk.green(`Project ${projectName} created successfully!`));
    console.log(chalk.yellow(`Run the following to start your project:`));
    console.log(chalk.cyan(`cd ${projectName} && npm run dev`));
  });

program
  .command("dev")
  .description("Start the Webbed development server")
  .action(() => {
    import("../server").then((server) => server.startServer());
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
