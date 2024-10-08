import React from "react";
import RecipeItem from "../component/recipeItem";
import Modal from "../component/Modal";
const Recipes = () => {
  return (
    <div className="flex flex-row items-center justify-center h-1/2">
      <RecipeItem />

      <Modal />
    </div>
  );
};

export default Recipes;
