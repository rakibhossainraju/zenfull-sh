#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import fileToDirName from "./file-url-to-dir-name.js";

/** @type {string} User's home directory */
const HOME = process.env.HOME || process.env.USERPROFILE || "";

/** @type {string} Path to local .zshrc file */
const LOCAL_ZSHRC_PATH = path.join(path.resolve(fileToDirName(import.meta.url).__dirname, ".zshrc"));

/** @type {string} Path to .zshrc file in home directory */
const ZSHRC_PATH = path.join(HOME, ".zshrc");

/**
 * Prompts the user with a question and returns their lowercase response.
 *
 * @async
 * @param {string} question - The question to display to the user
 * @returns {Promise<string>} The user's lowercased answer
 *
 * @example
 * const answer = await promptUser("Choose an option (a/b/c): ");
 * console.log(answer); // "a"
 */
async function promptUser(question) {
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

/**
 * Handles the case when a .zshrc file already exists.
 * Prompts the user with three options:
 * - a) I've moved the data to the new file
 * - b) Delete the existing file and add the new one
 * - c) Cancel
 *
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If file operations fail
 */
async function handleExistingZshrc() {
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

/**
 * Main entry point for the Zenfull Shell installation.
 * Checks if a .zshrc file exists and handles accordingly:
 * - If it exists: prompts user for action
 * - If it doesn't exist: copies new .zshrc to home directory
 *
 * @async
 * @returns {Promise<void>}
 */
async function main() {
  try {
    console.log("🔧 Installing Zenfull Shell Configuration...\n");

    if (fs.existsSync(ZSHRC_PATH)) {
      await handleExistingZshrc();
    } else {
      console.log("✓ No existing .zshrc file found.");
      console.log("✓ Copying new .zshrc to ~/.zshrc...");
      fs.copyFileSync(path.join(LOCAL_ZSHRC_PATH), ZSHRC_PATH);
      console.log("✓ Installation complete!");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
