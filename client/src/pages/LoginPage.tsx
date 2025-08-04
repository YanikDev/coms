import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { login } from "../features/user/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state: RootState) => state.user.users);

  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const foundUser = users.find(
      (u: { name: string; password: string; }) => u.name === username && u.password === password
    );
    if (foundUser) {
      dispatch(login(foundUser.name));
      navigate("/");
    } else {
      setError("Username or password is incorrect");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <div className="flex flex-col gap-4">
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Login
          </button>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
