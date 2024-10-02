import { useState, useEffect } from "react";
import Logo from "../assets/logo (2).png";
import { AiFillHome } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { SiTask } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (location.pathname === "/Home") {
      setActive("home");
    } else if (location.pathname === "/TodoList") {
      setActive("task");
    } else if (location.pathname === "/TaskCompelted") {
      setActive("Compelted");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // Hapus token dari cookies
    Cookies.remove("token");
    Cookies.remove("refToken");
    Cookies.remove("userId");
    navigate("/"); // Navigasi ke login
  };

  return (
    <div className="fixed top-0 left-0 w-56 h-screen bg-white border shadow-md flex flex-col p-2 z-10">
      <div className="flex items-center mb-4 text-black mt-3">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-semibold ml-2">MyTodoList</h1>
      </div>

      <h1 className="text-black font-mono font-semibold text-xl">Private</h1>
      <nav className="flex flex-col">
        <a
          onClick={() => {
            navigate("/Home"); // Navigasi ke Home
          }}
          className={`py-2 mb-2 rounded-md ${
            active === "home"
              ? "bg-black text-white"
              : "hover:bg-black hover:text-white"
          }`}
        >
          <h1 className="ml-2 font-mono text-base flex items-center gap-2">
            <AiFillHome /> Home
          </h1>
        </a>

        <a
          onClick={() => {
            navigate("/TodoList"); // Navigasi ke Task
          }}
          className={`py-2  mb-2 rounded-md ${
            active === "task"
              ? "bg-black text-white"
              : "hover:bg-black hover:text-white"
          }`}
        >
          <h1 className="ml-2 font-mono text-base flex items-center gap-2">
            <SiTask /> Task
          </h1>
        </a>

        <a
          onClick={() => {
            navigate("/TaskCompelted"); // Navigasi ke Task
          }}
          className={`py-2 rounded-md ${
            active === "Compelted"
              ? "bg-black text-white"
              : "hover:bg-black hover:text-white"
          }`}
        >
          <h1 className="ml-2 font-mono text-base flex items-center gap-2">
            <MdDoneAll /> Completed Tasks
          </h1>
        </a>

        <button
          onClick={handleLogout}
          className="justify-center mt-60 p-1.5 mx-1 rounded-xl border bg-black text-white"
        >
          <h1 className="font-mono font-medium">Logout</h1>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
