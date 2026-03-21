const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');

const app = express();

// on which path want to apply get request : / - Home page
// (req, res) is only for this particular route (/)
app.get('/', (req, res) => {
    return res.send('Hello from Home page!');
});

app.get('/about', (req, res) => {
    return res.send('Hello from About page' + ' hey ' + req.query.name + ' you are ' + req.query.age);
});

// now below ugly looking function is no more required, hence removed it

// this creats a web server for us
const myServer = http.createServer(app);

myServer.listen(8000, () => console.log('Server Started!'));