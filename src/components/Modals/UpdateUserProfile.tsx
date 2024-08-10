"use client";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js"; // Ensure you have this library for hashing
import { useAuth } from "../AuthProvider";

export type User = {
  userID: number;
  username: string;
  password: string;
}

interface UpdateModalProps {
  user?: User[];
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ user, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { userId } = useAuth();

  useEffect(() => {
    if (user) {
      const currentUser = user.find((u) => u.userID === userId);
      setUsername(currentUser?.username || "");
    }
  }, [user, userId]);

  const handleFormClick = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword || !username) {
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const hashedCurrentPassword = CryptoJS.SHA256(currentPassword).toString();
    const hashedNewPassword = CryptoJS.SHA256(newPassword).toString();

    const existingUsersJSON = localStorage.getItem("users");
    if (existingUsersJSON) {
      let existingUsers: User[] = JSON.parse(existingUsersJSON);

      const index = existingUsers.findIndex(
        (u) => u.userID === userId
      );

      if (index !== -1) {
        const userToUpdate = existingUsers[index];

        if (userToUpdate.password !== hashedCurrentPassword) {
          alert("Current password is incorrect.");
          return;
        }

        existingUsers[index] = { ...userToUpdate, username, password: hashedNewPassword };
        localStorage.setItem("users", JSON.stringify(existingUsers));
        alert("User updated successfully.");
        onClose();
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
      <div className="bg-white dark:bg-gray-900 w-[350px] h-[350px] md:w-[500px] md:h-[400px] border rounded-[16px] flex justify-center">
        <form className="m-1 pb-12" onClick={handleFormClick}>
          <div className="m-4 pb-12">
            <div className="mb-5 flex justify-center items-center">
              <h1 className="w-[120px] h-[15px] md:w-[116px] md:h-[24px] font-kanit font-bold text-center dark:text-white text-gray-700">
                UPDATE USER
              </h1>
            </div>
            <input
              className="border w-[310px] h-[30px] md:w-[440px] md:h-[38px] mb-2 outline-none rounded-[5px] px-[8px] py-[16px] dark:text-white dark:bg-gray-900"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderColor: "rgba(108, 99, 255, 1)" }}
              required
              placeholder="Username"
            />
            <div className="relative ">
              <input
                className="border w-[310px] h-[30px] md:w-[440px] md:h-[38px] mb-2 outline-none rounded-[5px] px-[8px] py-[16px] dark:text-white dark:bg-gray-900"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ borderColor: "rgba(108, 99, 255, 1)" }}
                placeholder="Current Password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <input
                className="border w-[310px] h-[30px] md:w-[440px] md:h-[38px] mb-2 outline-none rounded-[5px] px-[8px] py-[16px] dark:text-white dark:bg-gray-900"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ borderColor: "rgba(108, 99, 255, 1)" }}
                placeholder="New Password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <input
                className="border w-[310px] h-[30px] md:w-[440px] md:h-[38px] mb-2 outline-none rounded-[5px] px-[8px] py-[16px] dark:text-white dark:bg-gray-900"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ borderColor: "rgba(108, 99, 255, 1)" }}
                placeholder="Confirm New Password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex justify-between m-4 mt-2 md:m-4 md:mt-5">
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
              onClick={handleUpdate}
              className="flex items-center justify-center w-[97px] h-[38px] rounded-[5px] border px-[10px] py-[22px] font-kanit font-semibold md:font-bold text-white"
              style={{
                borderColor: "rgba(108, 99, 255, 1)",
                background: "rgba(108, 99, 255, 1)",
              }}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
