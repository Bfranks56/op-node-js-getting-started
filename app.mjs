import fs from 'fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';

/*
All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile() read the full content of the file in
memory before returning the data.

This means that big files are going to have a major impact on your memory consumption and speed of execution
of the program.

in this case a better option is to use stream to read the file content
*/

const fileURL = 'https://www.gutenberg.org/files/2701/2701-0.txt';
const outputFilePath = path.join(process.cwd(), 'moby.md');

async function downloadFile(url, outputPath) {
    const response = await fetch (url);

    if (!response.ok || !response.body) {
        throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
    }

    const fileStream = fs.createWriteStream(outputPath);
    console.log(`Downloading file from ${url} to ${outputPath}`);

    await pipeline(response.body, fileStream);
    console.log('File downloaded successfully');
};

async function readFile(filePath) {
    const readStream = fs.createReadStream(filePath, {encoding: 'utf8'});
    try {
        for await (const chunk of readStream) {
            console.log('--- File chunk start ---');
            console.log(chunk);
            console.log('--- File chunk end ---');
        }
        console.log('Finished reading the file.');
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
};

try {
    await downloadFile(fileURL, outputFilePath);
    await readFile(outputFilePath);
} catch (error) {
    console.error(`Error: ${error.message}`);
};