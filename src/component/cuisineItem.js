// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllCuisines } from "../api/auth";
// const CuisineItem = () => {
//   const { data: cuisines } = useQuery({
//     queryKey: ["cuisines"],
//     queryFn: getAllCuisines,
//   });
//   return (
//     <>
//       {cuisines?.data?.map((cuisine) => {
//         return (
//           <div
//             key={cuisine.id}
//             className="flex  justify-around items-center rounded-3xl   shadow-2xl w-[100vh] h-24 m-5"
//           >
//             <img
//               src={"http://localhost:8000/api" + cuisine.cuisineImage}
//               alt="recipe"
//               className="self-center h-20 w-20 rounded-full justify-start items-center"
//             />

//             <h3 className=" w-fit h-fit">{cuisine.name}</h3>
//             <h3 className=" w-fit h-fit">By: {cuisine.user}</h3>

//             <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors duration-300">
//               View Recipes
//             </button>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default CuisineItem;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCuisines } from "../api/auth";
import { Link } from "react-router-dom";
const CuisineItem = ({ setUsername }) => {
  const { data: cuisines } = useQuery({
    queryKey: ["cuisines"],
    queryFn: getAllCuisines,
  });

  return (
    <>
    
    {cuisines?.data?.map((cuisine) => {
      return (
        <div
          key={cuisine.id}
          className="flex flex-col  justify-around items-center rounded-3xl   shadow-2xl w-[30%] p-5"
        >
          <img
            src={"http://localhost:8000/" + cuisine.cuisineImage}
            alt="recipe"
            className="self-center h-20 w-20 rounded-full justify-start items-center"
          />

          <h3 className=" w-fit h-fit">{cuisine.name}</h3>
          <h3 className=" w-fit h-fit">By: {cuisine?.user?.name}</h3>

          <Link
            to={`/cuisines/${cuisine._id}`}
            className="bg-gradient-to-r border-2 border-gray-400 hover:from-gray-100 hover:to-gray-200 text-black font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 active:ring-2 active:ring-gray-500 active:ring-opacity-50 mr-4"
          >
            View Cuisine
          </Link>
        </div>
      );
    })}
  </>
);
};

export default CuisineItem;
