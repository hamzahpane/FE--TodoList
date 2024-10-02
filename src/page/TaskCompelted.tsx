import CompletedTask from "../components/CompletedTask";
import Navbar from "../components/Navbar";

const TaskCompelted = () => {
  return (
    <>
      <>
        <div className="flex">
          <Navbar />
          <div className="flex-1 p-3 ml-52 ">
            <CompletedTask />
          </div>
        </div>
      </>
    </>
  );
};

export default TaskCompelted;
