// 'use client'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

export interface Todo {
    id: number;
    content: string;
}

// const TodoList: React.FC = () => {
//     const [todos, setTodos] = useState<Todo[]>([]);

//     useEffect(() => {
//         const fetchTodos = async () => {
//             try {
//                 const response = await axios.get<Todo[]>('http://localhost:8000/todos');
//                 setTodos(response.data);
//             } catch (error) {
//                 console.error('Error fetching todos:', error);
//             }
//         };
//         fetchTodos();
//     }, []); // empty dependency array ensures the effect runs only once on component mount

//     return (
//         <div>
//             {todos.map(todo => (
//                 <div key={todo.id}>
//                     {todo.content}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default TodoList;



'use client'

import { useState, useEffect } from 'react';

const apiUrl = 'http://localhost:8000'; 

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchAndRenderTodos();
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${apiUrl}/todos/`);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (content:string) => {
        try {
            const todo = { content, id: 0 };
            const response = await fetch(`${apiUrl}/todos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
            const data = await response.json();
            console.log('Todo added:', data);
            fetchAndRenderTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const deleteTodo = async (todoId:number) => {
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
    };

    const updateTodo = async (todoId: number, updatedContent: string) => {
        const updatedTodo = { content: updatedContent };

        try {
            const response = await fetch(`${apiUrl}/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTodo)
            });
            const data = await response.json();
            console.log('Todo updated:', data);
            fetchAndRenderTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const fetchAndRenderTodos = async () => {
        try {
            const response = await fetch(`${apiUrl}/todos/`);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching and rendering todos:', error);
        }
    };

    const handleAddTodo = () => {
        const todoInput = prompt('Enter a new todo:');
        if (todoInput) {
            addTodo(todoInput.trim());
        }
    };

    return (
        <div>
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo:Todo) => (
                    <li key={todo.id}>
                        {todo.content}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <button onClick={() => {
                            const updatedContent = prompt('Enter updated content:', todo.content);
                            if (updatedContent) {
                                updateTodo(todo.id, updatedContent.trim());
                            }
                        }}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

