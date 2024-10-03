import instance from ".";

const createRecipe = async (
  mealName,
  cuisine,
  ingredients,
  description,
  image
) => {
  const response = await instance.post("recipes", {
    mealName: mealName,
    cuisine: cuisine,
    ingredients: ingredients,
    description: description,
    image: image,
  });
  return response.data;
};

export { createRecipe };
