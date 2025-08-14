import React, { useContext } from "react";
import { UseContext } from "../../context/UseContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UseContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex items-center text-gray-500 text-sm">
        Loading profile...
      </div>
    );
  }

  return (
    user &&(
    <div className="flex items-center ">
      <img
        src={user?.profileImageUrl || "/default-avatar.png"}
        alt={user?.name.split("")[0] || "User"}
        className="w-11 h-11 bg-gray-300 rounded-full mr-3"
      />
      <div>
        <div className="text-[15px] text-black font-bold leading-3">
          {user?.name || ""}
        </div>
      <button
        className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
        onClick={handleLogout}
      >
        Logout
      </button>
            </div>

    </div>
    )
  );
};

export default ProfileInfoCard;
