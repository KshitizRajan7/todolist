"use client";
import React, { useState } from "react";
import Search from "./Search";
import Select from "./Select";
import ColorScheme from "./ColorScheme";
import { headerProp } from "./Head";
import { useAuth } from "../AuthProvider";


const Header: React.FC<headerProp> = ({ onSearch, onSelect }) => {
  const {logout} =useAuth();

  const handleSearch = (task: string) => {
    onSearch(task);
  };
  const handleSelect = (task: string) => {
    if (onSelect) onSelect(task);
  };
  return (
    <div className=" w-[360px] h-[38px] md:w-[750px] md:h-[50px] gap-[4px] md:gap-[16px] flex items-center justify-center">
      <Search onSearch={handleSearch} onSelect={handleSelect} />
      <Select onSearch={handleSearch} onSelect={handleSelect} />
      <ColorScheme />
      <button onClick={logout} className="w-[50px] h-[38px] md:w-[75px] md:h-[38px] rounded-[5px] p-[5px] gap-[10px] text-[11px] text-white"
      style={{ backgroundColor: "rgba(108, 99, 255, 1)" }}>Logout </button>
    </div>
  );
};

export default Header;
