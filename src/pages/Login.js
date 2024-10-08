import React, { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import logo from "../media/logo.png";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(user),
    onSuccess: () => {
      navigate("/Home");
      setUser(true);
    },
    onError: () => {
      alert("Invalid username or password");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
    console.log(user);
  };

  // if (user) {
  //   return <Navigate to={"/"} />;
  // }
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Sign in</h1>
        <p className="mb-4">
          No user?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
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
