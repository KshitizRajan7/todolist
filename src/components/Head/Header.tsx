"use client";
import React, { useState } from "react";
import Search from "./Search";
import Select from "./Select";
import ColorScheme from "./ColorScheme";
import { headerProp } from "./Head";

const Header: React.FC<headerProp> = ({ onSearch, onSelect }) => {
  const handleSearch = (task: string) => {
    onSearch(task);
  };
  const handleSelect = (task: string) => {
    if (onSelect) onSelect(task);
  };
  return (
    <div className=" w-[360px] h-[38px] md:w-[750px] md:h-[38px] gap-[4px] md:gap-[16px] flex items-center justify-center">
      <Search onSearch={handleSearch} onSelect={handleSelect} />
      <Select onSearch={handleSearch} onSelect={handleSelect} />
      <ColorScheme />
    </div>
  );
};

export default Header;
