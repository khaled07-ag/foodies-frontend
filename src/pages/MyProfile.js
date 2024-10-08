import React, { useState } from "react";
import { useQuery, useQueryClient , useMutation} from "@tanstack/react-query";
import { getUserById } from "../api/auth";
import { updateMyProfile } from "../api/auth";
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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <img
          src={
            "http://localhost:8000/api" + myProfile?.image
          }
          alt="profile"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1>Name: {myProfile?.username}</h1>
        <h1>Email: {myProfile?.email}</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <input type="file" onChange={onPhotoChange} />
        <button onClick={handleSaveButton}>Save</button>
      </div>
    </div>
  );
};

export default MyProfile;
