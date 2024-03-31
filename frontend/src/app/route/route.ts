const apiUrl: string = 'http://localhost:8000'; // Update with your backend API URL

interface Todo {
    id: number;
    content: string;
}

async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch(`${apiUrl}/todos/`);
    const data: Todo[] = await response.json();
    return data;
}

async function addTodo(): Promise<void> {
    const todoInput: HTMLInputElement = document.getElementById('todoInput') as HTMLInputElement;
    const content: string = todoInput.value.trim();
    if (content === '') return;

    const todo: Todo = {
        content,
        id: 0
    };

    try {
        const response = await fetch(`${apiUrl}/todos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        const data: Todo = await response.json();
        console.log('Todo added:', data);
        todoInput.value = '';
        fetchAndRenderTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function deleteTodo(todoId: number): Promise<void> {
    try {
        const response = await fetch(`${apiUrl}/todos/${todoId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Todo deleted successfully');
            fetchAndRenderTodos();
        } else {
            console.error('Failed to delete todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

async function updateTodo(todoId: number, updatedContent: string): Promise<void> {
    const updatedTodo = { content: updatedContent };

    try {
        const response = await fetch(`${apiUrl}/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        });
        const data: Todo = await response.json();
        console.log('Todo updated:', data);
        fetchAndRenderTodos();
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

async function fetchAndRenderTodos(): Promise<void> {
    const todosDiv: HTMLElement = document.getElementById('todos') as HTMLElement;
    todosDiv.innerHTML = '';

    const todos: Todo[] = await fetchTodos();
    todos.forEach(todo => {
        const todoDiv: HTMLDivElement = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.innerHTML = `
            <input type="checkbox">
            <span>${todo.content}</span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
            <button onclick="updateTodoPrompt(${todo.id}, '${todo.content}')">Update</button>
        `;
        todosDiv.appendChild(todoDiv);
    });
}

function updateTodoPrompt(todoId: number, currentContent: string): void {
    const newContent: string | null = prompt('Enter the updated todo content:', currentContent);
    if (newContent !== null) {
        updateTodo(todoId, newContent);
    }
}

// Initial fetch and render todos
fetchAndRenderTodos();
