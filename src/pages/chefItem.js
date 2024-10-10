

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/auth";
import { Link } from "react-router-dom";
const ChefItem = ({ setUsername }) => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <>
    
    {users?.data?.map((user) => {
      return (
        <div
          key={user.id}
          className="flex flex-col  justify-around items-center rounded-3xl   shadow-2xl w-[30%] p-5"
        >
          <img
            src={"http://localhost:8000/" + user.userImage}
            alt="recipe"
            className="self-center h-20 w-20 rounded-full justify-start items-center"
          />

          <h3 className=" w-fit h-fit">{user.name}</h3>
          

          <Link
            to={`/users/${user._id}`}
            className="bg-gradient-to-r border-2 border-gray-400 hover:from-gray-100 hover:to-gray-200 text-black font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 active:ring-2 active:ring-gray-500 active:ring-opacity-50 mr-4"
          >
            View Chef
          </Link>
        </div>
      );
    })}
  </>
);
};

export default ChefItem;
