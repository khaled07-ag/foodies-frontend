import React, { useState } from "react";
import RecipeItem from "../component/recipeItem";
import RecipeDetail from "../component/RecipeDetail";

const Recipes = () => {
  // usequery -> get all recipes
  // map th
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <RecipeItem />
    </div>
  );
};

export default Recipes;
