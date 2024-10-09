import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUserById, updateMyProfile } from "../api/auth";
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
    queryKey: ["getUser"],
    queryFn: () => getUserById(),
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

  return (
    
    <div className="flex flex-col items-center justify-center h-screen bg-white text-white">
      <div className="w-full max-w-md bg-white rounded-b-3xl shadow-lg overflow-hidden">
        <div className="bg-orange-500 p-6 pb-32 relative">
          <div className="text-center mb-4">
            <p className="text-2xl font-light">"Live happy always"</p>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-3xl font-bold">{myProfile?.recipes?.length}</p>
              <p>Recipes</p>
            </div>
            <div>
              <p className="text-3xl font-bold">32</p>
              <p>Following</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <img
              src={myProfile?.image ? `http://localhost:8000/${myProfile.image}` : pic}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>
        </div>
        <div className="bg-white px-6 pt-16 pb-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{myProfile?.name}</h1>
            <p className="text-gray-600">
              <span className="inline-block mr-1">Cuisines:</span>
              {myProfile?.cuisines }
            </p>
          </div>
          <div className="flex justify-between mb-4">
            <div className="bg-orange-500 text-white p-3 rounded-lg">
              <p className="text-2xl font-bold">{myProfile?.recipes?.length}</p>
              <p className="text-sm">👥</p>
            </div>
            <div className="border border-orange-500 text-orange-500 p-3 rounded-lg flex-grow ml-4">
              <div className="flex items-center justify-between">
                <span>Profile</span>
                <span className="text-sm">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{width: "70%"}}></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="bg-white border border-gray-300 p-3 rounded-lg flex-1 mr-2 relative">
              <span className="text-3xl">✉️</span>
              <span className="absolute top-0 right-0 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">10</span>
            </div>
            <div className="bg-white border border-gray-300 p-3 rounded-lg flex-1 ml-2 relative">
              <img src="/path/to/cherry-blossom-image.jpg" alt="Cherry Blossom" className="w-full h-12 object-cover rounded" />
              <span className="absolute top-0 right-0 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default MyProfile;
