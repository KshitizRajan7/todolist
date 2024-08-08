"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import Select from "./Select";
import ColorScheme from "./ColorScheme";
import { headerProp } from "./Head";
import { useAuth } from "../AuthProvider";
import UpdateUserProfile, { User} from "../UpdateUserProfile";
import DeleteUserProfile from "../DeleteUserProfile";


const Header: React.FC<headerProp> = ({ onSearch, onSelect }) => {
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  // const [currentUser, setCurrentUser] = useState("");
  const {logout} =useAuth();
  const {userName} =useAuth();


  useEffect(() => {
    // Fetch users from localStorage when component mounts
    const usersJSON = localStorage.getItem("users");
    if (usersJSON) {
      const usersList: User[] = JSON.parse(usersJSON);
      setUsers(usersList);
    }
  }, []);

  

  const handleUpdate = () => {
    //handles the click event of update button according the key value of id of the task
    setShowUpdateModal(true);
    // setUpdatedId(id);
  };

  const handleDelete = () => {
    //handles the click event of update button according the key value of id of the task
    setShowDeleteModal(true);
    // setUpdatedId(id);
  };
  
  const handleSearch = (task: string) => {
    onSearch(task);
  };
  const handleSelect = (task: string) => {
    if (onSelect) onSelect(task);
  };

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    const value = e.target.value;
    if (value === selectedOption) {
      // If the selected option is the same as the previously selected option
      // Run the appropriate function directly
      switch (value) {
        case 'true':
          logout();
          break;
        case 'update':
          handleUpdate();
          break;
        case 'delete':
          handleDelete();
          break;
        default:
          break;
      }
    } else {
      // Update the selected option and run the function
      setSelectedOption(value);
      switch (value) {
        case 'true':
          logout();
          break;
        case 'update':
          handleUpdate();
          break;
        case 'delete':
          handleDelete();
          break;
        default:
          break;
      }
    }}

  const handleCloseButtonClick = () => {
    //handles the click event of the modal to be disappear from the screen by setting the state of showMoal as 
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };




  return (
    <div className="z-10 w-[360px] h-[38px] md:w-[750px] md:h-[50px] gap-[4px] md:gap-[16px] flex items-center justify-center">
      <Search onSearch={handleSearch} onSelect={handleSelect} />
      <Select onSearch={handleSearch} onSelect={handleSelect} />
      <ColorScheme />
      <select value="user" onChange={handleUserSelect} className="cursor-pointer w-[50px] h-[38px] md:w-[75px] md:h-[38px] rounded-[5px] p-[5px] gap-[10px] text-[11px] text-white"
      style={{ backgroundColor: "rgba(108, 99, 255, 1)" }}>
        <option className="hidden" value="user">{userName}</option>
        <option value="update">Update Account</option>
        <option value="delete">Delete Account</option>
        <option value="true">Logout</option>  
      </select>
      {showUpdateModal && (
        <UpdateUserProfile
          // onUpdate={handleUpdateTodo}
          user={users}
          onClose={() => handleCloseButtonClick()}
        />
      )}
      {showDeleteModal && (
        <DeleteUserProfile
          // onUpdate={handleUpdateTodo}
          // updateId={updateId}
          // newTodos={newTodos}
          onClose={() => handleCloseButtonClick()}
        />
      )}
    </div>
  );
};

export default Header;
