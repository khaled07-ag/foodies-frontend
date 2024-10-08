import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/auth";
const ChefItem = ({setUsername}) => {
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
            className="flex  justify-around items-center rounded-3xl   shadow-2xl w-[100vh] h-24 m-5"
            
          >
            <img
              src={
                "http://localhost:8000/api" + user.userImage
              }
              alt="user"
              className="self-center h-20 w-20 rounded-full justify-start items-center"
            />

            <h3 className=" w-fit h-fit">{user.name}</h3>
            <h3 className=" w-fit h-fit">About me: {user.description}</h3>
            <h3 className=" w-fit h-fit">Cuisines: {user.cuisines}</h3>
            <button
              className="bg-orange-600 p-4 rounded-2xl hover:bg-orange-600 hover:scale-110 active:bg-orange-700 active:scale-95"
              onClick={() => {
                setUsername(user.username);
              }}
            >
              View Recipes
            </button>
          </div>
        );
      })}

    </>
  );
};

export default ChefItem;
