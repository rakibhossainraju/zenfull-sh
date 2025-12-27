#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const HOME = process.env.HOME || process.env.USERPROFILE || "";
const ZSHRC_PATH = path.join(HOME, ".zshrc");

async function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}

async function handleExistingZshrc(): Promise<void> {
  console.log("\n⚠️  A .zshrc file already exists at ~/.zshrc\n");
  console.log("If you don't want to lose any data, please move any variables or declarations to the new file.\n");

  const answer = await promptUser(
    "Choose an option:\n" +
      "a) I've moved the data to the new file\n" +
      "b) Delete the existing file and add the new one\n" +
      "c) Cancel\n" +
      "Enter your choice (a/b/c): "
  );

  switch (answer) {
    case "a":
      console.log("✓ Copying new .zshrc to ~/.zshrc...");
      fs.copyFileSync(path.join(process.cwd(), ".zshrc"), ZSHRC_PATH);
      console.log("✓ Done! Your .zshrc has been updated.");
      break;

    case "b":
      console.log("⚠️  Deleting existing .zshrc...");
      fs.unlinkSync(ZSHRC_PATH);
      console.log("✓ Creating new .zshrc...");
      fs.copyFileSync(path.join(process.cwd(), ".zshrc"), ZSHRC_PATH);
      console.log("✓ Done! New .zshrc has been created.");
      break;

    case "c":
      console.log("✓ Installation cancelled. No changes made.");
      process.exit(0);
      break;

    default:
      console.log("❌ Invalid choice. Please run the script again.");
      process.exit(1);
  }
}

async function main(): Promise<void> {
  try {
    console.log("🔧 Installing Zenfull Shell Configuration...\n");

    if (fs.existsSync(ZSHRC_PATH)) {
      await handleExistingZshrc();
    } else {
      console.log("✓ No existing .zshrc file found.");
      console.log("✓ Copying new .zshrc to ~/.zshrc...");
      fs.copyFileSync(path.join(process.cwd(), ".zshrc"), ZSHRC_PATH);
      console.log("✓ Installation complete!");
    }
  } catch (error) {
    console.error("❌ Error:", (error as Error).message);
    process.exit(1);
  }
}

main();
