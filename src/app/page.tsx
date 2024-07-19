"use client";
import { useState } from "react";
import Head from "../components/Head/Head";
import Body from "@/components/Body/Body";
export default function Home() {
  const [searchTask, setSearchTask] = useState("");
  const [selectTask, setSelectTask] = useState("");
  const handleSearch = (task: string) => {
    //this function will take a take with type string and set the searchTask accordingly.
    setSearchTask(task);
  };
  const handleSelect = (task: string) => {
    //this function will take a task with type string and set the selectTask accordingly.
    setSelectTask(task);
  };
  return (
    <main className="h-full w-screen flex justify-center items-center dark:bg-gray-900">
      <div className="w-[450px] h-[950px] md:w-[1400px] md:h-[710px] dark:bg-gray-900  bg-white flex flex-col items-center ">
        <div className=" w-[360px] h-[660px] mt-1 overflow-hidden md:w-[750px] md:h-[710px] flex flex-col items-center">
          <Head onSearch={handleSearch} onSelect={handleSelect} />
          {/* onSearch and onSelect props will perform the function that takes a string variable */}
          <Body searchTask={searchTask} selectTask={selectTask} />
          {/* searchTask and selectTask props will pass the value that was on the state of searchTask and selectTask set according to their functions that set the state value */}
        </div>
      </div>
    </main>
  );
}
