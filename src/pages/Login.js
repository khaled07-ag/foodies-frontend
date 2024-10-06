import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import logo from "../media/logo.png";
const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [login, setLogin] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
    console.log(userInfo);
  };
  if (user) {
    return <Navigate to={"/Home"} />;
  }
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Sign in</h1>
        <p className="mb-4">
          No user? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <input
            type="email"
            name="email"
            placeholder="email:"
            onChange={handleChange}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="password:"
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-1/2 bg-black flex justify-center items-center">
        <img src={logo} alt="Logo" className="w-24 h-24" />
      </div>
    </div>
  );
};

export default Login;
