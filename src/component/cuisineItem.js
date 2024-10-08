import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllCuisines } from '../api/auth'
const CuisineItem = () => {
  const {data:cuisines} = useQuery({
    queryKey:['cuisines'],
    queryFn:getAllCuisines
  })
  return (
    <>
    {cuisines?.data?.map((cuisine) => {
        return (
          <div
            key={cuisine.id}
            className="flex  justify-around items-center rounded-3xl   shadow-2xl w-[100vh] h-24 m-5"
            
          >
            <img
              src={
                "http://localhost:8000/api" + cuisine.cuisineImage
              }
              alt="recipe"
              className="self-center h-20 w-20 rounded-full justify-start items-center"
            />

            <h3 className=" w-fit h-fit">{cuisine.name}</h3>
            <h3 className=" w-fit h-fit">By: {cuisine.user}</h3>

            <button
              className="bg-orange-600 p-4 rounded-2xl hover:bg-orange-600 hover:scale-110 active:bg-orange-700 active:scale-95"
             
            >
              View Recipes
            </button>
          </div>
        );
      })}

    </>
  );
};


export default CuisineItem