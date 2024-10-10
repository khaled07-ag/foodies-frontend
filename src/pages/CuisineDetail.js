import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCuisineById } from "../api/auth";

const CuisineDetail = () => {
  const { id } = useParams();
  const { data: cuisine } = useQuery({
    queryKey: ["cuisine", id],
    queryFn: () => getCuisineById(id),
  });
  console.log(cuisine);
  if (!cuisine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-center items-center mt-12 p-8 bg-white rounded-xl shadow-lg">
      <img
        src={`http://localhost:8000/${cuisine?.data?.cuisineImage}`}
        alt={cuisine?.data?.name}
        className="w-50 flex justify-center items-center h-50 object-cover rounded-full mb-8"
      />

      <h1 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-4">
        {cuisine?.data?.name}
      </h1>
      <p className="text-xl text-gray-600 mb-8">{cuisine?.data?.description}</p>

      <div className="flex justify-center items-center grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Recipes:
          </h2>
          <div className="text-xl text-gray-600">
            {cuisine?.data?.recipes?.map((recipe) => (
              <p key={recipe._id}>{recipe.mealName}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

CuisineDetail.propTypes = {
  recipe: PropTypes.shape({
    mealName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    cuisine: PropTypes.string.isRequired,
    chefName: PropTypes.string.isRequired,
  }),
};

export default CuisineDetail;
