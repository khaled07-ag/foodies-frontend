import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getMyProfile, updateMyProfile } from "../api/auth";
import pic from "../media/profile-pic-placeholder.png";

const MyProfile = () => {
  const [photo, setPhoto] = useState(pic);

  const queryClient = useQueryClient();
  const onPhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const { data: myProfile } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: () => getMyProfile(),
  });
  const { mutate } = useMutation({
    mutationKey: ["updateMyProfile"],
    mutationFn: () => updateMyProfile(photo),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      alert("Error changing profile picture");
    },
  });

  const handleSaveButton = () => {
    mutate();
  };

  console.log(myProfile);
  return (
    <div className="flex flex-col items-center justify-center bg-white text-white">
      <div className="w-full max-w-md bg-white rounded-b-3xl shadow-lg overflow-hidden">
        <div className="bg-orange-500 p-6 pb-32 relative">
          
          <div className="flex justify-center items-center mb-4">
            <div className="flex flex-col justify-center p-4 items-center">
              <p className="text-3xl  font-bold justify-center align-middle">
                {myProfile?.data?.recipes?.length}
              </p>
              <p>Recipes</p>
            </div>
           
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <img
              src={
                myProfile?.data?.image
                  ? `http://localhost:8000/${myProfile.image}`
                  : pic
              }
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>
        </div>
        <div className="bg-white px-6 pt-16 pb-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {myProfile?.data?.name}
            </h1>
            <p className="text-gray-600">
              <span className="inline-block mr-1">Cuisines:</span>
              {myProfile?.data?.Cuisines.map((cuisine) => (
                <span key={cuisine._id}>{cuisine.name} </span>
              ))}
            </p>
          </div>
          <div className="flex justify-between mb-4">
            <div className="bg-orange-500 text-white p-3 rounded-lg">
              <p className="text-2xl font-bold">
                {myProfile?.data?.recipes?.length}
              </p>
              <p className="text-sm">👥</p>
            </div>
            <div className="border border-orange-500 text-orange-500 p-3 rounded-lg flex-grow ml-4">
              <div className="flex items-center justify-between">
                <span>Description:</span>
                <span className="text-sm">{myProfile?.data?.description}</span>
              </div>
             
              
            </div>
          </div>
          <div className="flex justify-between">
           
           
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-4 flex-wrap ">
        {myProfile?.data?.recipes?.map((recipe) => (
          <div className="bg-white border border-gray-300 p-3 rounded-lg flex-1 ml-2 relative">
            <div key={recipe._id} className="flex flex-col gap-2">
              <img
                src={"http://localhost:8000/" + recipe.recipeImage}
                alt={recipe.name}
                className="w-full h-12 object-cover rounded-full"
              />
            
              <p className="text-gray-800">{recipe.mealName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
