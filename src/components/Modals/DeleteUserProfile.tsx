"use client";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js"; // Ensure you have this library for hashing
import { useAuth } from "../AuthProvider";

export type User = {
  userID: number;
  username: string;
  password: string;
};

interface DeleteModalProps {
  user?: User[];
  onClose: () => void;
}

const UpdateModal: React.FC<DeleteModalProps> = ({ user, onClose }) => {
  const [username, setUsername] = useState<string>("");
  const { userId } = useAuth();
  const { logout } = useAuth();

  useEffect(() => {
    if (user) {
      const currentUser = user.find((u) => u.userID === userId);
      setUsername(currentUser?.username || "");
    }
  }, [user, userId]);

  const handleFormClick = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDelete = () => {
    const existingUsersJSON = localStorage.getItem("users");
    if (existingUsersJSON) {
      let existingUsers: User[] = JSON.parse(existingUsersJSON);

      const updatedUsers = existingUsers.filter((u) => u.userID !== userId);

      if (existingUsers.length !== updatedUsers.length) {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("User deleted successfully.");
        logout();
      } else {
        alert("User not found.");
      }
    } else {
      alert("No users found in localStorage.");
    }
  };

  return (
    <div
      id="wrapper"
      onClick={(e) => {
        const id = (e.target as HTMLDivElement).id;
        if (id === "wrapper") onClose();
      }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white dark:bg-gray-900 w-[350px] h-[200px] md:w-[500px] md:h-[200px] border rounded-[16px] flex justify-center">
        <form className="m-1 pb-12" onClick={handleFormClick}>
          <div className="m-4 pb-12">
            <div className="mb-5 flex justify-center items-center">
              <h1 className="w-[120px] h-[15px] md:w-[116px] md:h-[24px] font-kanit font-bold text-center dark:text-white text-gray-700">
                DELETE USER
              </h1>
            </div>
            <div>
              <p className="font-kanit text-black dark:text-white"> Are you sure that you want to delete your account?</p>
            </div>
            <div className="flex justify-between m-4 mt-2 md:m-4 md:mt-5 gap-20">
              <button
                className="flex items-center justify-center w-[110px] h-[38px] rounded-[5px] border px-[10px] py-[22px] font-kanit font-semibold md:font-bold"
                style={{
                  borderColor: "rgba(108, 99, 255, 1)",
                  color: "rgba(108, 99, 255, 1)",
                }}
                onClick={() => onClose()} 
              >
                CANCEL
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center w-[97px] h-[38px] rounded-[5px] border px-[10px] py-[22px] font-kanit font-semibold md:font-bold text-white"
                style={{
                  borderColor: "rgba(108, 99, 255, 1)",
                  background: "rgba(108, 99, 255, 1)",
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
