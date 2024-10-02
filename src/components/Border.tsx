import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/Hooks/hook";
import {
  fetchTodos,
  fetchAddTodos,
  setTodos,
} from "./redux/Features/createTodo/libs/Todo";
import { BsLampFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { AddTodo } from "./redux/Features/createTodo/libs/definitio";
import Cookies from "js-cookie";
import TodoList from "./TodoList";
import CompletedTask from "./CompletedTask";

const Border = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");

  const userId = Cookies.get("userId") ? parseInt(Cookies.get("userId")!) : 1;

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch(setTodos(JSON.parse(storedTodos)));
    } else {
      dispatch(fetchTodos());
    }
  }, [dispatch]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const todoData: Omit<AddTodo, "id"> = {
      todo: newTodo,
      completed: false,
      userId: userId,
    };

    dispatch(fetchAddTodos(todoData)).then((action) => {
      if (fetchAddTodos.fulfilled.match(action)) {
        const newTodo = action.payload;
        const updatedTodos = [...todos, newTodo];
        dispatch(setTodos(updatedTodos));
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      }
    });

    setNewTodo("");
  };

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
    <>
      <div className="p-2 mx-2">
        <h1 className="text-3xl font-bold font-mono">{getGreeting()}!</h1>
        <p className="text-sm mt-1 mb-4 font-semibold font-mono text-gray-400">
          {getCurrentDate()}
        </p>
        <div className="border flex bg-gray-180 font-mono h-28 rounded-2xl shadow-sm">
          <div className="mt-4 ml-2">
            <BsLampFill />
          </div>
          <p className="ml-2 mt-3 text-black">
            Are you tired of juggling multiple tasks and deadlines? Our
            To-Do-List app is here to simplify your life and boost your
            productivity. Whether it's work-related projects, household chores,
            or personal goals, we've got you covered.
          </p>
        </div>
        <form className="flex flex-col items-end" onSubmit={handleAddTodo}>
          <input
            type="text"
            id="todo-input"
            name="todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Masukkan todolist"
            className="w-full mt-3 p-2 border border-gray-300 rounded-2xl font-mono focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="border flex font-mono bg-black text-white p-2 w-full items-center mt-3 rounded-xl"
          >
            <FiPlus /> <h1 className="ml-2">New Task</h1>
          </button>
        </form>

        {/* Your Tasks */}
        <div className="mt-4 mx-2">
          <TodoList />
        </div>

        {/* Completed Tasks */}
        <div className="mt-4 mx-2">
          <CompletedTask />
        </div>
      </div>
    </>
  );
};

export default Border;
