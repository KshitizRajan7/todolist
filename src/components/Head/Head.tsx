"use client";
import React from "react";
import Header from "./Header";
import { useAuth } from "../AuthProvider";

export interface headerProp {
  onSearch: (task: string) => void;
  onSelect: (selectedOption: string) => void;
}

const Head: React.FC<headerProp> = ({ onSearch, onSelect }) => {
  const handleSearch = (task: string) => {
    onSearch(task);
  };
  const handleSelect = (task: string) => {
    if (onSelect) {
      onSelect(task);
    }
  };

  const Greeting =()=>{
    const {userName} = useAuth();
    if(!userName)
      return <h1>User</h1>

    return <h1 className="font-kanit font-bold dark:text-white text-black">Hello, {userName}</h1>
  }

  return (
    <div className=" w-[320px] h-[135px] md:w-[750px] md:h-[135px] pt-[40px] flex flex-col items-center">
      <h1 className="w-[150px] h-[39px] md:w-[150px] md:h-[39px] text-[20px] md:text-[26px] font-kanit font-semibold leading-[38.87px] dark:text-white">
        TODO LIST
      </h1>
      <div className=" w-[735px] text-end">
      <Greeting/>
      </div>
      <Header onSearch={handleSearch} onSelect={handleSelect} />
    </div>
  );
};

export default Head;
