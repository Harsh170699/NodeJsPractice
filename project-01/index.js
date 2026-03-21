const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

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
        // Edit user with id
        return res.json({ status: 'pending' });
    })
    .delete((req, res) => {
        // Delete user with id
        return res.json({ status: 'pending' });
    })

// Create new User
app.post('/api/users', (req, res) => {
    // TODO: Create new user
    return res.json({ status: 'pending' });
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));