"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { headerProp } from "./Head";

const Search: React.FC<headerProp> = ({ onSearch }) => {
  const [searchData, setSearchData] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchData.trim()); //trim removes the leading and ending white spaces
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  return (
    <div className=" w-[200px] h-[35px] md:w-[595px] md:h-[38px] rounded-[5px] border dark:border-white border-black items-center p-2">
      <form className="flex" action="" onSubmit={handleSubmit}>
        <input
          value={searchData}
          onChange={handleChange}
          className="md:w-[595px] md:h-[16px] w-[160px] h-[15px] border-none outline-none dark:bg-gray-900 dark:text-white"
          type="text"
          placeholder="search note"
        />
        <button type="submit" className="border-none outline-none">
          <FaSearch className=" md:w-[21px] md:h-[21px] w-[30px] h-[15px] cursor-pointer dark:text-white" />
        </button>
      </form>
    </div>
  );
};

export default Search;
