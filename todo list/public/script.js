document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Function to fetch and display todos from the server
    async function fetchTodos() {
        try {
            const response = await fetch('/api/todos');
            const todos = await response.json();
            todos.forEach(todo => {
                displayTodo(todo);
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    // Function to display a todo item
    function displayTodo(todo) {
        const li = document.createElement('li');
        li.textContent = todo.task;
        todoList.appendChild(li);
    }
/*
    // Event listener for form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const task = input.value;
        if (task.trim() !== '') {
            try {
                const response = await fetch('/api/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task })
                });
                const newTodo = await response.json();
                displayTodo(newTodo);
                input.value = '';
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    });
*/
    // Fetch todos on page load
    fetchTodos();
});
