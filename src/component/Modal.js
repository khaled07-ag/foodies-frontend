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
      // alert("ADDED PET!!!!");
      setShowModal(false);
      bigBoss.invalidateQueries(["getAllPets"]);
    },
  });

  if (!show) return "";

  // const handelCreatePet = async () => {
  //   const res = await creatPet(name, image, type, available);
  //   console.log(res);
  // };

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
        />
        <Input
          name="Cuisine"
          onChange={(e) => {
            setCuisine(e.target.value);
          }}
        />
        <Input
          name="meal Image Link"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <Input
          name="Ingredients"
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
        />
        <Input
          name="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button
          onClick={mutate}
          className="w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-green-400"
        >
          {/* <button onClick={handelCreatePet} className="w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-green-400"> */}
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
