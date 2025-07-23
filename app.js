const fs = require('node:fs');
// use this import instead if using promises
// const fs = require ('node:fs/promises');

const content = 'Some content!';

// Asyncronously write to a file
// flag 'a+' opens the file for reading and writing and also positions the stream at the end of the file
fs.writeFile('./testUser/test.txt', content, {flag: 'a+'}, err => {
    if (err) {
        console.log(err);
    } else {
        // file written successfully
    }
});

// // Synchronously write to a file
// try {
//     fs.writeFileSync('/Users/joe/test.txt', content);
// } catch (err) {
//     console.error(err);
// };


// // promise based write
// async function example() {
//     try {
//         const content = 'Some content!';
//         await fs.writeFile('/Users/joe/test.txt', content);
//     } catch (err) {
//         console.log(err);
//     }
// };

// example();
// // end promise based write

// // appending content to a file
// fs.appendFile('file.log', content, err => {
//     if (err) {
//         console.error(err);
//     } else {
//         // done!
//     }
// });
