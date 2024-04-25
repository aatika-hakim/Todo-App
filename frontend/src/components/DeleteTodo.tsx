"use client";
import React from "react";
import { Flip, ToastContainer, toast } from "react-toastify"; 

interface Id {
  todo_id: number;
}

export default function DeleteTodo({ todo_id }: Id) {
  const deleteHandler = async () => {
    try {
      const res = await fetch(`api/todos/${todo_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Todo deleted successfully.");
        toast.success("Todo deleted!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      } else {
        console.error("Failed to delete Todo.");
        toast.error("Failed to delete todo. Please try again."); 
      }
    } catch (error) {
      console.error("Error while deleting Todo.", error);
      toast.error("An error occurred while deleting. Please try again.");
    }
  };

  return (
    <>
      <button
        className="px-4 ml-10 py-2 rounded-lg"
        onClick={deleteHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
      <ToastContainer />
    </>
  );
}