#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Function to generate a random letter
function getRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Path to the text.js file
const textFilePath = path.join(__dirname, "text.js");

// Read the current content of text.js
let currentText = require(textFilePath);

// Add a random letter to the text
const randomLetter = getRandomLetter();
const newText = currentText + randomLetter;

// Write the new content back to text.js
const newContent = `const text = "${newText}";\n\nmodule.exports = text;\n`;
fs.writeFileSync(textFilePath, newContent, "utf8");

// Change to the directory of your Git repository
const repoPath = path.join(__dirname);
process.chdir(repoPath);

// Get the current date and time for the commit message
const currentDate = new Date()
  .toISOString()
  .replace(/T/, " ")
  .replace(/\..+/, "");

try {
  // Add changes
  execSync("git add .", { stdio: "inherit" });

  // Commit changes with a unique message
  execSync(`git commit -m "Automated commit on ${currentDate}"`, {
    stdio: "inherit",
  });

  // Push changes
  execSync("git push origin main", { stdio: "inherit" });

  console.log("Changes committed and pushed successfully.");
} catch (error) {
  console.error("Error during commit or push:", error.message);
}
