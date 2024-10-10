import React, { useState } from "react";
import Input from "./input";
import { createRecipe } from "../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Modal = ({ show, setShowModal }) => {
  const [mealName, setMealName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState(["", "", ""]);
  const [description, setDescription] = useState("");
  const bigBoss = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createRecipe"],
    mutationFn: () =>
      createRecipe({ mealName, cuisine, ingredients, description, image }),
    onSuccess: () => {
      setShowModal(false);
      bigBoss.invalidateQueries(["getAllRecipes"]);
    },
  });

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleSubmit = () => {
    const filteredIngredients = ingredients.filter((ing) => ing.trim() !== "");
    console.log({ mealName, cuisine, image, filteredIngredients, description });
    mutate({
      mealName,
      cuisine,
      image,
      ingredients: filteredIngredients,
      description,
    });
  };

  const cuisineOptions = [
    "Italian",
    "Mexican",
    "Chinese",
    "Indian",
    "Japanese",
    "French",
    "Thai",
    "Greek",
    "Spanish",
    "American",
    // Add more cuisines as needed
  ];

  if (!show) return "";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white rounded-xl shadow-2xl w-[95%] md:w-[550px] max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Recipe
          </h3>
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={() => setShowModal(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4 space-y-4">
          <Input
            type="text"
            name="Meal Name"
            onChange={(e) => setMealName(e.target.value)}
            value={mealName}
            placeholder="Enter the meal name"
            required
          />
          <Input
            type="select"
            name="Cuisine"
            onChange={(e) => setCuisine(e.target.value)}
            value={cuisine}
            placeholder="Select the cuisine"
            options={cuisineOptions}
            className="bg-blue-500 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            name="Meal Image Link"
            onChange={(e) => setImage(e.target.files[0])}
            placeholder="Enter the image link"
            required
          />
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            {ingredients.map((ingredient, index) => (
              <Input
                key={index}
                type="text"
                name={`Ingredient ${index + 1}`}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                value={ingredient}
                placeholder={`Enter ingredient ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={addIngredientField}
              className="mt-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Add Ingredient
            </button>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
            disabled={
              !mealName || !cuisine || !image || !ingredients || !description
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
