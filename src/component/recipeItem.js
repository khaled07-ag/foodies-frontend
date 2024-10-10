import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes, getOneRecipe } from "../api/auth";
import { Link } from "react-router-dom";
const RecipeItem = ({ setUsername }) => {
  const { data: recipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });
  const [oneRecipe, setOneRecipe] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const id = 1; // Assuming id is available in the scope
  useQuery({
    queryKey: ["oneRecipe"],
    queryFn: () => getOneRecipe(id),
    onSuccess: (data) => setOneRecipe(data),
  });
  console.log(oneRecipe);
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

            <Link
              to={`/recipes/${recipe._id}`}
              className="bg-gradient-to-r border-2 border-gray-400 hover:from-gray-100 hover:to-gray-200 text-black font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 active:ring-2 active:ring-gray-500 active:ring-opacity-50 mr-4"
            >
              View Recipe
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default RecipeItem;
