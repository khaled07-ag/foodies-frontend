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

const CuisineItem = ({ setUsername }) => {
  const { data: cuisines } = useQuery({
    queryKey: ["cuisines"],
    queryFn: getAllCuisines,
  });

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 max-w-screen-xl">
        {cuisines?.data?.map((cuisine) => {
          return (
            <div
              key={cuisine.id}
              onClick={() => setUsername(cuisine.user)} // Make the entire card clickable
              className="flex flex-col items-center bg-white shadow-xl rounded-xl w-full h-96 p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer" // Add cursor-pointer for visual feedback
            >
              <img
                src={"http://localhost:8000/api" + cuisine.cuisineImage}
                alt={cuisine.name}
                className="h-44 w-44 rounded-full mb-6"
              />
              <h3 className="text-xl font-bold mb-2">{cuisine.name}</h3>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CuisineItem;
