// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllRecipes } from "../api/auth";
// const RecipeItem = ({ setUsername }) => {
//   const { data: recipes } = useQuery({
//     queryKey: ["getAllRecipes"],
//     queryFn: getAllRecipes,
//   });

//   console.log(recipes);
//   return (
//     <>
//       {recipes?.data?.map((recipe) => {
//         return (
//           <div
//             key={recipe.id}
//             className="flex  justify-around items-center rounded-3xl   shadow-2xl w-[100vh] h-24 m-5"
//           >
//             <img
//               src={"http://localhost:8000/api" + recipe.recipeImage}
//               alt="recipe"
//               className="self-center h-20 w-20 rounded-full justify-start items-center"
//             />

//             <h3 className=" w-fit h-fit">{recipe.mealName}</h3>
//             <h3 className=" w-fit h-fit">By: {recipe.user}</h3>

//             <button
//               className="bg-orange-600 p-4 rounded-2xl hover:bg-orange-600 hover:scale-110 active:bg-orange-700 active:scale-95"
//               onClick={() => {
//                 setUsername(recipe.user);
//               }}
//             >
//               View Recipes
//             </button>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default RecipeItem;

//////////

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAllRecipes } from "../api/auth";

// const RecipeItem = ({ setUsername }) => {
//   const { data: recipes } = useQuery({
//     queryKey: ["recipes"],
//     queryFn: getAllRecipes,
//   });

//   console.log(recipes);
//   return (
//     <div className="flex justify-center bg-gray-100 min-h-screen">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 max-w-screen-xl">
//         {recipes?.data?.map((recipe) => {
//           return (
//             <div
//               key={recipe.id}
//               className="flex flex-col items-center bg-white shadow-xl rounded-xl w-full h-96 p-6 hover:shadow-2xl transition-shadow duration-300"
//             >
//               <img
//                 src={"http://localhost:8000/api" + recipe.recipeImage}
//                 alt="recipe"
//                 className="h-44 w-44 rounded-full mb-6"
//               />
//               <h3 className="text-xl font-bold mb-2">{recipe.mealName}</h3>
//               <p className="text-sm text-gray-600 mb-6">By: {recipe.user}</p>
//               <button
//                 className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors duration-300"
//                 onClick={() => {
//                   setUsername(recipe.user);
//                 }}
//               >
//                 View Recipes
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RecipeItem;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../api/auth";
const RecipeItem = ({ setUsername }) => {
  const { data: recipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });

  console.log(recipes);
  return (
    <>
      {recipes?.data?.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className="flex flex-col  justify-around items-center rounded-3xl   shadow-2xl w-[30%] p-5"
          >
            <img
              src={"http://localhost:8000/" + recipe.recipeImage}
              alt="recipe"
              className="self-center h-20 w-20 rounded-full justify-start items-center"
            />

            <h3 className=" w-fit h-fit">{recipe.mealName}</h3>
            <h3 className=" w-fit h-fit">By: {recipe?.user?.name}</h3>

            <button
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-600 hover:to-orange-700  p-4 rounded-2xl hover:bg-orange-600 hover:scale-110 active:bg-orange-700 active:scale-95"
              // onClick={() => {
              //   setUsername(recipe.user);
              // }}
            >
              View Recipes
            </button>
          </div>
        );
      })}
    </>
  );
};

export default RecipeItem;
