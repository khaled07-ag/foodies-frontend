import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneUser, getAllRecipes } from "../api/auth";
import pic from "../media/profile-pic-placeholder.png";

const ChefDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getOneUser(id),
  });
  
  const { data: recipes, isLoading: recipesLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });

  if (userLoading || recipesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white text-white">
      <div className="w-full max-w-md bg-white rounded-b-3xl shadow-lg overflow-hidden">
        {/* Chef Information */}
        <div className="bg-red-700 p-6 pb-32 relative">
          <div className="flex justify-center items-center mb-4">
            <div className="flex flex-col justify-center p-4 items-center">
              <p className="text-3xl font-bold">{user?.data?.recipes?.length || 0}</p>
              <p>Recipes</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <img
              src={user?.data?.image ? `http://localhost:8000/${user.data.image}` : pic}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>
        </div>

        <div className="bg-white px-6 pt-16 pb-6">
          {/* Chef Name and Cuisines */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{user?.data?.name}</h1>
            <p className="text-gray-600">
              <span className="inline-block mr-1">Cuisines:</span>
              {user?.data?.Cuisines?.length > 0 ? (
                user.data.Cuisines.map((cuisine) => (
                  <span key={cuisine._id} className="mr-1">{cuisine.name}</span>
                ))
              ) : (
                <span>No cuisines listed.</span>
              )}
            </p>
          </div>

          {/* Chef Description */}
          <div className="border border-red-700 text-red-700 p-3 rounded-lg flex-grow ml-4">
            <div className="flex items-center p-3 justify-between">
              <span>Description:</span>
              <span className="text-sm">{user?.data?.description || "No description provided."}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Display Recipes */}
      <div className="flex gap-6 justify-between mt-4 flex-wrap">
        {user?.data?.recipes?.length > 0 ? (
          user.data.recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white border w-80 h-auto border-gray-300 p-3 rounded-lg flex-1 ml-2 relative cursor-pointer"
              onClick={() => navigate(`/recipes/${recipe._id}`)}
            >
              <div className="flex flex-col gap-2">
                <img
                  src={`http://localhost:8000/${recipe.recipeImage}`}
                  alt={recipe.mealName}
                  className="w-full p-3 h-auto object-cover rounded-lg"
                />
                <p className="text-gray-800">{recipe.mealName}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default ChefDetail;