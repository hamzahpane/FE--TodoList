import React, { useState } from "react";
import Logo from "../assets/logo (2).png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LoginApi } from "../components/redux/Features/Login/api";
import { signInRequest } from "../components/redux/Features/Login/definition";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navTo = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginValue, setLoginValue] = useState<signInRequest>({
    username: "",
    password: "",
    expiresInMins: 60,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0); // State untuk progress

  const handleLoginValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error state
    setProgress(0); // Reset progress

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10; // Update progress
      });
    }, 100); // Update setiap 100ms

    try {
      const res = await LoginApi(loginValue);
      if (res) {
        setProgress(100); // Set progress to 100 when successful
        navTo("/home"); // Arahkan ke halaman home
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Please try again."); // Set error message
    } finally {
      setIsLoading(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="flex items-center justify-center mt-0 mx-5 h-screen">
      <div className="w-1/2 max-w-md h-auto bg-white border flex flex-col items-center justify-center p-6 rounded-lg shadow-lg">
        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-black h-2 rounded-full  width: `${progress}%`"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <div className="flex items-center font-mono font-medium justify-center mb-4">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-semibold ml-1">MyTodoList</h1>
        </div>
        <h2 className="text-center mb-2 text-2xl font-bold font-mono">
          Welcome Back!
        </h2>
        <h1 className="text-center mb-3 text-sm font-semibold font-mono text-gray-600">
          "Simplify your life with our tool for easy task management"
        </h1>
        {error && <p className="text-gray-500 font-mono  mb-4">{error}</p>}{" "}
        {/* Tampilkan pesan kesalahan */}
        <form onSubmit={onClicked} className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-3 font-mono font-semibold"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginValue.username}
              placeholder="Enter your username"
              onChange={handleLoginValueChange}
              className="w-full p-2 border border-gray-300 rounded-2xl font-mono focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 mb-3 font-mono font-semibold"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              id="password"
              name="password"
              value={loginValue.password}
              placeholder="Enter your password"
              onChange={handleLoginValueChange}
              className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
              className="absolute right-4 top-12"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-black font-mono font-semibold text-white rounded-xl"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
