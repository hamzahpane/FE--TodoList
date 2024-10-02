import {
  fetchTodos,
  fetchCompletedTodo,
  fetchUpdateTodo,
  setTodos,
} from "./redux/Features/createTodo/libs/Todo";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/Hooks/hook";
import { LuClipboardList } from "react-icons/lu";
import { geTodo } from "./redux/Features/createTodo/libs/definitio";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const todosPerPage = 5;
  const pendingTodos = todos.filter((todo) => !todo.completed);

  const [editingTodo, setEditingTodo] = useState<geTodo | null>(null);
  const [updatedTodoText, setUpdatedTodoText] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch(setTodos(JSON.parse(storedTodos)));
    } else {
      dispatch(fetchTodos());
    }
  }, [dispatch]);

  const handleCompleteTask = (id: number) => {
    dispatch(fetchCompletedTodo(id));
  };

  const handleEditTodo = (todo: geTodo) => {
    setEditingTodo(todo);
    setUpdatedTodoText(todo.todo);
  };

  const handleUpdateTodo = () => {
    if (editingTodo) {
      dispatch(
        fetchUpdateTodo({
          id: editingTodo.id,
          completed: editingTodo.completed,
          todo: updatedTodoText,
        })
      ).then(() => {
        setEditingTodo(null);
        setUpdatedTodoText("");
      });
    }
  };

  const totalPendingPages = Math.ceil(pendingTodos.length / todosPerPage);
  const indexOfLastPendingTodo = currentPagePending * todosPerPage;
  const indexOfFirstPendingTodo = indexOfLastPendingTodo - todosPerPage;
  const currentPendingTodos = pendingTodos.slice(
    indexOfFirstPendingTodo,
    indexOfLastPendingTodo
  );

  return (
    <div className="p-2 mx-2">
      <h2 className="text-xl flex items-center gap-1 font-mono font-bold">
        <LuClipboardList />
        Your Tasks:
      </h2>
      <ul className="list-disc p-1 pl-5 pr-2">
        {currentPendingTodos.map((todo) => (
          <li
            key={todo.id}
            className="text-black p-1 flex justify-between border mb-2 rounded-md"
          >
            {editingTodo?.id === todo.id ? (
              <input
                type="text"
                value={updatedTodoText}
                placeholder="isi"
                onChange={(e) => setUpdatedTodoText(e.target.value)}
                className="font-mono"
              />
            ) : (
              <p className="ml-1 font-mono">{todo.todo}</p>
            )}
            <div className="flex gap-2">
              <h1 className="font-mono">(Pending)</h1>
              <button onClick={() => handleCompleteTask(todo.id)}>
                <h1> End Task </h1>
              </button>
              {editingTodo?.id === todo.id ? (
                <div className="flex gap-2">
                  <button onClick={handleUpdateTodo}>Update</button>
                  <button onClick={() => setEditingTodo(null)}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => handleEditTodo(todo)}>
                  <h1>edit</h1>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {/* Navigasi Halaman untuk Your Tasks */}
      <div className="flex justify-center mt-2">
        {Array.from({ length: totalPendingPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPagePending(index + 1)}
            className={`mx-1 px-2 py-1 border rounded ${
              currentPagePending === index + 1
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
