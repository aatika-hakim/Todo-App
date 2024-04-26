"use client";
import { useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTodo = () => {
  const [task, setTask] = useState("");

  const SubmitHandler = async (e: any) => {
    e.preventDefault(); 
    if (!task.trim()) {
      toast.error("Add Task", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ content: task }),
      });

      if (res.ok) {
        toast.success("Task Added!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "dark",
          transition: Slide,
        });
        setTask("");
      } else {
        toast.error("Sorry! Failed to Add Task", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "dark",
          transition: Slide,
        });
        console.error("Error adding task:", await res.text());
      }
    } catch (error) {
      toast.error("Something went wrong.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Slide,
      });
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-5 justify-center items-center gap-2">
        <form
          className="flex gap-5 flex-col md:flex-row md:gap-2 items-center justify-center"
          onSubmit={SubmitHandler}
        >
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter Your Task"
            className="w-full flex-wrap text-white bg-slate-900 p-4 rounded-sm focus:border-2 border-solid border-l-blue-500 border-r-cyan-600 border-t-cyan-600 border-b-purple-700 outline-none hover:bg-blue-950 transition duration-300"
          />

          <button className="w-[50%] p-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-md text-md text-white  hover:from-cyan-600 hover:to-purple-800 hover:scale-105 transition duration-300">
            Add Task
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
export default CreateTodo;