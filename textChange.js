const fs = require("fs");
const path = require("path");

// Function to generate a random letter
function getRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Path to the text.js file
const textFilePath = path.join(__dirname, "text.js");

// Read the current content of text.js
let currentText = fs
  .readFileSync(textFilePath, "utf8")
  .replace('const text = "', "")
  .replace('";\n\nmodule.exports = text;\n', "");

// Add a random letter to the text
const randomLetter = getRandomLetter();
const newText = currentText + randomLetter;

// Write the new content back to text.js
const newContent = `const text = "${newText}";\n\nmodule.exports = text;\n`;
fs.writeFileSync(textFilePath, newContent, "utf8");

console.log("text.js has been updated successfully.");
