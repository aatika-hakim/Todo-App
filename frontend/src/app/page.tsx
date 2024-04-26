import CreateTodo from "@/src/components/CreateTodo";
import TodoList from "@/src/components/TodoList";

export default function Home() {
  return (
    <div className="w-full h-[100%] pb-[630px] bg-gray-800 selection:text-white">
      <div className="flex justify-center items-center">
        <h1 className="pt-12 pb-10 text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-purple-700 inline-block text-transparent bg-clip-text">
          Todo List
        </h1>
      </div>
      <CreateTodo />
      <TodoList />
    </div>
  );
}