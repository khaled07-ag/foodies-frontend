import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
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
    <div className="bg-white justify-center flex mt-10">
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
