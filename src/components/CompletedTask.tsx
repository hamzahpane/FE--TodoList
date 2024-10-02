import { fetchTodos, setTodos } from "./redux/Features/createTodo/libs/Todo";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/Hooks/hook";
import { AiOutlineFileDone } from "react-icons/ai";

const CompletedTask = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const todosPerPage = 5;

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch(setTodos(JSON.parse(storedTodos)));
    } else {
      dispatch(fetchTodos());
    }
  }, [dispatch]);

  const completedTodos = todos.filter((todo) => todo.completed);

  const totalCompletedPages = Math.ceil(completedTodos.length / todosPerPage);
  const indexOfLastCompletedTodo = currentPageCompleted * todosPerPage;
  const indexOfFirstCompletedTodo = indexOfLastCompletedTodo - todosPerPage;
  const currentCompletedTodos = completedTodos.slice(
    indexOfFirstCompletedTodo,
    indexOfLastCompletedTodo
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const getCurrentDate = (): string => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="p-2 mx-2">
      <h1 className="text-3xl font-bold font-mono">{getGreeting()}!</h1>
      <p className="text-sm mt-1 mb-4 font-semibold font-mono text-gray-400">
        {getCurrentDate()}
      </p>
      <div className="mt-4 mx-2">
        <h2 className="text-xl flex items-center gap-1 font-mono font-bold">
          <AiOutlineFileDone />
          Completed Tasks:
        </h2>
        <ul className="list-disc p-1 pl-5 pr-2">
          {currentCompletedTodos.map((todo) => (
            <li
              key={todo.id}
              className="text-black p-1 flex justify-between border mb-2 rounded-md"
            >
              <p className="ml-1 font-mono">{todo.todo}</p>
              <h1 className="font-mono">(Completed)</h1>
            </li>
          ))}
        </ul>
        {/* Navigasi Halaman untuk Completed Tasks */}
        <div className="flex justify-center mt-2">
          {Array.from({ length: totalCompletedPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPageCompleted(index + 1)}
              className={`mx-1 px-2 py-1 border rounded ${
                currentPageCompleted === index + 1
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
