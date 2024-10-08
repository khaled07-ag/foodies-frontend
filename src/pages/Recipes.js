// import React from "react";
// import RecipeItem from "../component/recipeItem";
// import Modal from "../component/Modal";
// const Recipes = () => {
//   return (
//     <div className="flex flex-row items-center justify-center h-1/2">
//       <RecipeItem />

//       <Modal />
//     </div>
//   );
// };

// export default Recipes;

import React, { useState } from "react";
import RecipeItem from "../component/recipeItem";
import Modal from "../component/Modal";

const Recipes = () => {
  // usequery -> get all recipes
  // map th

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <RecipeItem />
    </div>
  );
};

export default Recipes;
