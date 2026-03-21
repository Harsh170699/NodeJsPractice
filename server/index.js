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
    return res.send('Hello from About page!');
});

function myHandler(req, res) {
    if (req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true);         // true means parse the query string
    // Using non blocking request - this will support parallel requests
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                if (req.method === 'GET') res.end('Home page!');
                break;

            case '/about':
                const userName = myUrl.query.myname;
                res.end(`About page! Hi ${userName}`);
                break;

            case '/signUp':
                if (req.method === 'GET') res.end('This is a signup form');
                else if (req.method === 'POST') {
                    // Database Query
                    res.end('Success');
                }
                break;

            default:
                res.end('404 Not Found');
        }
    })
}

// this creats a web server for us
const myServer = http.createServer(app);

// Who will handle this webserver ?
// For that we should have a handler function, which can process incoming request
// createServer takes a callback function (requestListener) which will handle the request
// requestListener is a function that takes two parameters: request and response
// request is an object that contains information about the incoming request
// response is an object that contains information about the response

// Whenever there is a incoming request on our server, then it runs the callback function

myServer.listen(8000, () => console.log('Server Started!'));