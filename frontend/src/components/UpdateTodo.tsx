"use client";
import React, { useState } from "react";
import { Todo } from "@/src/types/Todo";

interface UpdateTodoProps {
    todoId: number;
}

export default function UpdateTodo({ todoId }: UpdateTodoProps) {
    const [todo, setTodo] = useState<Todo>({ id: todoId, content: "" });
    const [showDialog, setShowDialog] = useState(false);

    const updateHandler = async () => {
        try {
            const res = await fetch(`api/todos/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: todo.content }),
            });
            if (res.ok) {
                console.log("Todo updated successfully!");
                setShowDialog(false);
                console.error("Error updating todo:", await res.text());
            }
        } catch (error) {
            console.error("Error while updating todo item:", error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTodo({ ...todo, content: event.target.value });
    };

    return (
        <div>
            <button
                className="px-4 py-2 rounded-lg"
                onClick={() => setShowDialog(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button>

            {showDialog && (
                <div className="fixed inset-0 text-black bg-slate-900 bg-opacity-75 z-50 flex  flex-wrap items-center justify-center">
                    <div className=" bg-slate-900 rounded-lg shadow-md p-4 w-[35%] border-2 border-solid border-l-blue-500 border-r-cyan-500 border-t-cyan-500 border-b-blue-500">
                        <textarea
                            value={todo.content}
                            onChange={handleChange}
                            placeholder="Update Your Task"
                            className="w-full px-4 py-2 rounded-md mb-2 text-white focus:border-2 border-solid border-l-blue-500 border-r-cyan-500 border-t-cyan-500 border-b-blue-500 outline-none bg-slate-800"
                        />
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 rounded-lg mr-2 bg-slate-800 text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition duration-300"
                                onClick={updateHandler}
                            >
                                Save
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg  bg-slate-800 text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition duration-300 "
                                onClick={() => setShowDialog(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}