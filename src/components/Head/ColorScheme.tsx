"use client";
import React, { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";

const ColorScheme = () => {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("theme"); //get the value of the key theme from localstorage
    if (theme === "dark") setDarkMode(true);
  }, []); // run for one time when ever component mounts

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); //adds css class dark in the html element document.document.element
      //classlist property provides add method to manipulate the element's class
      localStorage.setItem("theme", "dark"); //sets theme as dark
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]); //runs whenever there is changes in darkMode

  const handleTheme = () => { //handles the click event on toggle button to switch themes
    setDarkMode(!darkMode); //toggles the darkMode state between true and false
  };
  return (
    <div
      className="rounded-[5px] h-[38px] md:h-[38px] w-[38px] left-[712px] flex items-center justify-center cursor-pointer dark:bg-gray-900"
      style={{ backgroundColor: "rgba(108, 99, 255, 1)" }}
      onClick={handleTheme}
    >
      {!darkMode ? (
        <FaRegMoon
          className="w-[15px] md:w-[22px] h-[22px] top-[8px] left-[720px]"
          style={{ color: "rgba(247, 247, 247, 1)" }}
        />
      ) : (
        <LuSunMedium
          className="w-[20px] md:w-[22px] h-[22px] top-[8px] left-[720px]"
          style={{ color: "rgba(247, 247, 247, 1)" }}
        />
      )}
    </div>
  );
};

export default ColorScheme;
