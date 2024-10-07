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
const getUser = async () => {
  const { data } = await instance.get("users/me");
  return data;
};
const updateMyProfile = async (photo) => {
  const { data } = await instance.put("users/me", { photo });
  return data;
};
export { createRecipe, login, getUser, updateMyProfile };
