import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneRecipe } from "../api/auth";

const RecipeDetail = () => {
  const { id } = useParams();
  const { data: recipe } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getOneRecipe(id),
  });
  console.log(recipe);
  if (!recipe) {
    return <div>Loading...</div>;
  }

  let ingredients = recipe?.data?.ingredients[0].split(",");
  ingredients[0] =
    ingredients[0][0] == "[" ? ingredients[0].slice(1) : ingredients[0];
  const lastIngredient = ingredients.pop();
  console.log("lastIngredient", lastIngredient.slice(0, -1));
  ingredients.push(lastIngredient.slice(0, -1));
  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-center items-center mt-12 p-8 bg-white rounded-xl shadow-lg">
      <img
        src={`http://localhost:8000/${recipe?.data?.recipeImage}`}
        alt={recipe?.data?.mealName}
        className="w-50 flex justify-center items-center h-50 object-cover rounded-full mb-8"
      />

      <h1 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-4">
        {recipe?.data?.mealName}
      </h1>
      <p className="text-xl text-gray-600 mb-8">{recipe?.data?.description}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Ingredients:
        </h2>
        <ul className="list-disc pl-8 space-y-2 text-lg">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Cuisine:
          </h2>
          <p className="text-xl text-gray-600">{recipe?.data?.cuisine?.name}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Chef:</h2>
          <p className="text-xl text-gray-600">{recipe?.data?.user?.name}</p>
        </div>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  recipe: PropTypes.shape({
    mealName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    cuisine: PropTypes.string.isRequired,
    chefName: PropTypes.string.isRequired,
  }),
};

export default RecipeDetail;
