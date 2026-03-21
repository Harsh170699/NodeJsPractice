const fs = require('fs');
const os = require('os');

console.log('CPU Cores:', os.cpus().length);

// This was a synchronous call - Blocking request
// fs.writeFileSync('./test.txt', 'Hello World');

// This is asynchronous call - Non-blocking request
// fs.writeFile('./test.txt', 'Hello World There', (err) => {});

// utf8 is a standard encoding format for text files
// Blocking request
// console.log("1");
// const content = fs.readFileSync('./contacts.txt', 'utf8');
// console.log(content);
// console.log("2");
// Non - blocking request
console.log("1");
fs.readFile('./contacts.txt', 'utf8', (err, content) => {
    console.log(content)
})
console.log("2");
// fs.appendFileSync('./contacts.txt', new Date().getDate().toLocaleString());
// fs.appendFileSync('./contacts.txt', 'Hey There\n');
// fs.cpSync('./test.txt', './copy.txt');
// fs.unlinkSync('./copy.txt')
// console.log(fs.statSync('test.txt'));

// fs.mkdirSync('my-docs');

// fs.mkdirSync('my-docsss/a/b', { recursive: true });