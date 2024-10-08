import React, { useState } from "react";
import Input from "./input";
import { createRecipe } from "../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Modal = ({ show, setShowModal }) => {
  const [mealName, setMealName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const bigBoss = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["creatOnePet"],
    mutationFn: () =>
      createRecipe(mealName, cuisine, ingredients, description, image),
    onSuccess: () => {
      setShowModal(false);
      bigBoss.invalidateQueries(["getAllPets"]);
    },
  });

  if (!show) return "";

  return (
    <div
      className="inset-0 fixed  flex justify-center items-center flex-col z-20 overflow-hidden 
  "
    >
      <div className="bg-black absolute z-0 opacity-70 inset-0 "></div>
      <div className="relative z-10 flex flex-col gap-3 border-[3px] border-black rounded-md w-[95%] md:w-[40%] h-[300px] md:h-[30%] bg-white pt-[50px]">
        <button
          className="right-0 top-2 absolute w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-red-400"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close
        </button>
        <Input
          name="meal Name"
          onChange={(e) => {
            setMealName(e.target.value);
          }}
          value={mealName}
          placeholder="Enter the meal name"
          required
        />
        <Input
          name="Cuisine"
          onChange={(e) => {
            setCuisine(e.target.value);
          }}
          value={cuisine}
          placeholder="Enter the cuisine"
        />
        <Input
          name="meal Image Link"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          value={image}
          placeholder="Enter the image link"
          required
        />
        <Input
          name="Ingredients"
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
          value={ingredients}
          placeholder="Enter the ingredients"
        />
        <Input
          name="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          placeholder="Enter the description"
          required
        />

        <button
          onClick={mutate}
          className="w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-green-400"
          type="submit"
          disabled={
            !mealName || !cuisine || !image || !ingredients || !description
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
