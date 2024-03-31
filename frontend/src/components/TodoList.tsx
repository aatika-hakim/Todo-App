'use client'

import React, { useState, useEffect } from 'react';

interface Todo {
    id: number;
    content: string;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:8000/todos/');
            const data: Todo[] = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        try {
            const response = await fetch('http://localhost:8000/todos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newTodo }),
            });
            const data: Todo = await response.json();
            setTodos([...todos, data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await fetch(`http://localhost:8000/todos/${id}`, {
                method: 'DELETE',
            });
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="container">
            <h1>Todo App</h1>
            <div id="todos">
                {todos.map((todo) => (
                    <div key={todo.id}>
                        <span>{todo.content}</span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Enter a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
};

export default TodoList;
