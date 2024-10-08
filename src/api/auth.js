import instance from ".";
import { storeToken } from "./storage";
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
const login = async (userInfo) => {
  const { data } = await instance.post("users/signin", userInfo);
  storeToken(data.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post("users/signup", formData);
  storeToken(data.token);
  return data;
};

export { createRecipe, login, register };
