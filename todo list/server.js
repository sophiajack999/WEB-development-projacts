const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Array to store todo list items
let todoList = [];

 //Route to get all todo list items
app.get('/api/todos', (req, res) => {
    res.json(todoList);
});

// Route to add a new todo list item
app.post('/api/todos', (req, res) => {
    const { task } = req.body;
    if (task && task.trim() !== '') {
        const newTodo = {
            id: todoList.length + 1,
            task: task.trim()
        };
        todoList.push(newTodo);
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: 'Invalid task format' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
