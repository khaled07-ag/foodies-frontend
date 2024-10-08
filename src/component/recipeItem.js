import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../api/auth";
const RecipeItem = ({setUsername}) => {
  const { data: recipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });
  return (
    <>
      {recipes?.data?.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className="flex  justify-around items-center rounded-3xl   shadow-2xl w-[100vh] h-24 m-5"
            
          >
            <img
              src={
                "http://localhost:8000/api" + recipe.recipeImage
              }
              alt="recipe"
              className="self-center h-20 w-20 rounded-full justify-start items-center"
            />

            <h3 className=" w-fit h-fit">{recipe.mealName}</h3>
            <h3 className=" w-fit h-fit">By: {recipe.user}</h3>

            <button
              className="bg-orange-600 p-4 rounded-2xl hover:bg-orange-600 hover:scale-110 active:bg-orange-700 active:scale-95"
              onClick={() => {
                setUsername(recipe.user);
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

export default RecipeItem;
