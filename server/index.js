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

app.get('/profile', (req, res) => {
    return res.send('Hello from Profile page');
});

app.listen(8000, () => console.log('Server Started!'));