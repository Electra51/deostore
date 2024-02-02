import React from "react";
import { useAuth } from "../../context/auth";
import profileImg from "../../assets/woman.png";
const ProfilePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className="flex flex-col h-[50%] justify-center items-center">
      <div role="button" className="avatar">
        <div className="w-20 rounded-full">
          <img alt="Profile image" src={profileImg} />
        </div>
      </div>
      <p className="mt-5">UserName: {auth.user?.name}</p>
      <p>Email: {auth.user?.email}</p>
      <p>Phone Number: {auth.user?.phone}</p>
    </div>
  );
};

export default ProfilePage;
