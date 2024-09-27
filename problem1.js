const fs = require("fs").promises;
const path = require("path");
const directoryFilesPath = path.join(__dirname, "json-files");

/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 

    Solve using Promise
*/

async function createAndDelete(numberOfFiles = 1) {
  createDirectory(directoryFilesPath)
    .then(() => createJsonFiles(numberOfFiles, directoryFilesPath))
    .then((paths) => {
      deleteJsonFiles(paths);
    })
    .then(() => {
      console.log("All files deleted!");
    })
    .catch(console.log);
}

function createDirectory(directoryFilesPath) {
  return fs.mkdir(directoryFilesPath, { recursive: true });
}

function generateRandomJsonValues() {
  return JSON.stringify({
    id: Math.floor(Math.random() * 100000),
    user: `User${Math.floor(Math.random() * 1000)}`,
    value: Math.random() * 10,
  });
}

async function createJsonFiles(numberOfFiles, directoryPath) {
  const filePaths = [];
  for (let index = 1; index <= numberOfFiles; index++) {
    const fileName = path.join(directoryPath, `file${index}.json`);
    const jsonData = generateRandomJsonValues();

    try {
      await fs.writeFile(fileName, jsonData);
      console.log(`file${index}.json file created`);
      filePaths.push(fileName);
    } catch (err) {
      console.log("Error generate Random json file, " + err);
    }
  }
  return filePaths;
}

function deleteJsonFiles(paths) {
  const deleteFiles = paths.map((file) => fs.unlink(file));
  return Promise.all(deleteFiles);
}

module.exports = { createAndDelete };
