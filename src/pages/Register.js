import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import logo from "../media/logo.png"; // Add your logo here

const Registration = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState("");
  const [nameError, setnameError] = useState("");

  const { mutate: handlesignUp } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () => register(userInfo),
    onError: (error) => {
      if (error.response?.status === 409) {
        setnameError("name is already taken");
      } else {
        setError("Something went wrong. Please try again.");
      }
    },
    onSuccess: () => setUser(true),
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setnameError("");

    // Front-end validation
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    handlesignUp();
  };

  if (user) {
    return <Navigate to={"/Home"} />;
  }

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <p className="mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
        <form onSubmit={handleFormSubmit} className="w-full max-w-sm">
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
            required
          />
          {nameError && <p className="text-red-500 mb-3">{nameError}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
            required
          />
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-black flex justify-center items-center">
        <img src={logo} alt="Logo" className="w-24 h-24" />
      </div>
    </div>
  );
};

export default Registration;
