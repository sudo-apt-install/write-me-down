// Required helper files
const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => fs.writeToFile(destination, JSON.stringify(content, null, 4), (err) => err ? console.error(err) : console.info(`\nData written to ${destination}`))


// Read content and append it to file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
}

module.exports = {readFromFile, writeToFile, readAndAppend}