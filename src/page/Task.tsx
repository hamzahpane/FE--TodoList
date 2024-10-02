import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";

const Task = () => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-1 p-3 ml-52 ">
          <TodoList />
        </div>
      </div>
    </>
  );
};

export default Task;
