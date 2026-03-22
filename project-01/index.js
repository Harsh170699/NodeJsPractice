const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 8000;

// It is a plugin (Middleware) - Whenever will get form data, this will enter it into req.body
// This middleware will run first as it is defined before other routes.
// For this middleware, next is the below app.use which is defined
app.use(express.urlencoded({ extended: false }));

// Creating Middleware using app.use
// This middleware will be called after the above middleware
app.use((req, res, next) => {
    console.log("Middleware called");
    next();
})

// ROUTES
// List all users
app.get('/api/users', (req, res) => {
    return res.json(users);
})

// HTML Document Render - Server Side rendered page
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join('')}
        </ul>`
    return res.send(html);
})

// as /api/users/:id was same for 3 tasks, we combined them
app.route('/api/users/:id').get((req, res) => {
    // Get user by ID
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})
    .patch((req, res) => {
        // Update the user using id
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        // Update user with new data
        Object.assign(user, req.body);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({status: 'success', id: users.length});
        });
    })
    .delete((req, res) => {
        // Delete user with id
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        users.splice(users.indexOf(user), 1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({status: 'success', id: users.length});
        });
    })

// Create new User
app.post('/api/users', (req, res) => {
    // TODO: Create new user
    const body = req.body;
    console.log("body: ", body);
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: 'success', id: users.length});
    });
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));