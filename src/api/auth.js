import instance from ".";
import { storeToken } from "./storage";
//recipes
const createRecipe = async (recipe) => {
  const formData = new FormData();
  for (const k in recipe) formData.append(k, recipe[k]);
  const { data } = await instance.post("/recipes", formData);
  return data;
};

const getAllRecipes = async () => {
  const { data } = await instance.get("/recipes");
  return data;
};
const getRecipeById = async (id) => {
  const { data } = await instance.get(`/recipes/${id}`);
  return data;
};
const deleteRecipeById = async (id) => {
  const { data } = await instance.delete(`/recipes/${id}`);
  return data;
};
const updateRecipeById = async (id, recipe) => {
  const { data } = await instance.put(`/recipes/${id}`, recipe);
  return data;
};
//users
const login = async (userInfo) => {
  const { data } = await instance.post("/users/signin", userInfo);
  storeToken(data.token);
  return data;
};
const register = async (userInfo) => {
  const formData = new FormData();
  for (const k in userInfo) formData.append(k, userInfo[k]);
  const { data } = await instance.post("/users/signup", formData);
  storeToken(data.token);
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/users");
  return data;
};
const getUserById = async (id) => {
  const { data } = await instance.get(`/users/${id}`);
  return data;
};
const updateMyProfile = async (id, photo) => {
  const { data } = await instance.put(`/users/${id}`, { photo });
  return data;
};
//cuisines
const getAllCuisines = async () => {
  const { data } = await instance.get("/cuisines");
  return data;
};
const createCuisine = async (cuisine) => {
  const { data } = await instance.post("/cuisines", cuisine);
  return data;
};
const getCuisineById = async (id) => {
  const { data } = await instance.get(`/cuisines/${id}`);
  return data;
};
const deleteCuisineById = async (id) => {
  const { data } = await instance.delete(`/cuisines/${id}`);
  return data;
};
const updateCuisineById = async (id, cuisine) => {
  const { data } = await instance.put(`/cuisines/${id}`, cuisine);
  return data;
};

export {
  createRecipe,
  login,
  getAllUsers,
  updateMyProfile,
  getAllRecipes,
  getRecipeById,
  register,
  getUserById,
  deleteRecipeById,
  updateRecipeById,
  getAllCuisines,
  createCuisine,
  deleteCuisineById,
  updateCuisineById,
  getCuisineById,
};
