"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import detective from "../../image/detective.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";

export type Task = {
  //type task that defines object with properties as follows
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

interface ListProps {
  //the interface defines the structure of props that will be in the component that uses this interface
  userId: number;
  // tasks: Task[]; //takes array of Task object
  newTodos: Task[];
  searchTask: string;
  selectTask: string;
  handleUpdate: (id: number) => void; //function that takes a number and returns void
  handleRemove: (id: number) => void;
  handleCheckboxChange: (id: number) => void;
}

const List: React.FC<ListProps> = React.memo (({
  userId,
  handleCheckboxChange,
  newTodos,
  searchTask,
  selectTask,
  handleUpdate,
  handleRemove,
}) => {
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null); //the type annotation <number | null> defines that hoveredTaskId can be number or
  //null is initilized to mkae sure that no task was hovered.

  const handleMouseEnter = (taskId: number | null) => {
    setHoveredTaskId(taskId);
  };

  const handleMouseLeave = () => {
    setHoveredTaskId(null);
  };

  const userTasks = newTodos.filter(task=> task.userId === userId);

  const FilterNewTodo = userTasks.filter((newtodo) =>
    newtodo.title.toLowerCase().includes(searchTask.toLowerCase())
  );

  const filteredTasksBySelect = FilterNewTodo.filter((task) => {
    if (selectTask === "all") {
      return true; // Include all tasks when selectQuery is "all"
    } else if (selectTask === "true") {
      return task.completed === true;
    } else if (selectTask === "false") {
      return task.completed === false;
    } else {
      return true; // Default case, include all tasks
    }
  });

  const renderTasks = (taskList: Task[]) =>
    taskList.map((task, index) => (
        <div
          key={task.id}
          className={`flex gap-1 ${
            index !== taskList.length - 1 ? "border-b" : ""
          } w-[250px] md:w-full`}
          style={{ borderBlockColor: "rgba(108, 99, 255, 1)" }}
          onMouseEnter={() => handleMouseEnter(task.id)}
          onMouseLeave={handleMouseLeave}
        >
          <input
            className="w-3 md:w-5 cursor-pointer"
            style={{ borderBlockColor: "rgba(108, 99, 255, 1)" }}
            type="checkbox"
            checked={task.completed}
            onChange={() => handleCheckboxChange(task.id)}
            readOnly
          />

          <div className="flex gap-1 w-[300px] md:w-[450px] dark:text-white">
            <div className="  max-w-[150px] md:max-w-[300px] p-4 overflow-hidden text-ellipsis whitespace-nowrap ">
              <Link
                href="#"
                className={`text-base ${task.completed ? "line-through" : ""}`}
              >
                {task.title}
              </Link>
            </div>
            <div
              className={`flex gap-1 md:gap-2 items-center justify-center md:mr-2 ml-auto ${
                hoveredTaskId === task.id ? "block" : "hidden"
              }`}
            >
              <button
                className="cursor-pointer hover:text-green-500"
                onClick={() => handleUpdate(task.id)}
              >
                <GoPencil />
              </button>
              <button
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleRemove(task.id)}
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          </div>

          <hr />
        </div>
    ));

  return (
    <div
      className={`flex justify-center w-[300px] h-[545px] md:w-[520px] md:h-[545px] ${
        filteredTasksBySelect.length === 0
          ? "overflow-hidden"
          : "overflow-scroll"
      }`}
    >
      <div>
        {filteredTasksBySelect.length !== 0 ? (
          renderTasks(filteredTasksBySelect)
        ) : (
          <div className="md:w-[221px] md:h-[174px]">
            <img src={detective.src} alt="No task" />
            <div className="flex justify-center items-center ">
              <p className="md:w-[69px] md:h-[20px] font-normal font-kaint dark:text-white text-black text-[20px] leading-5">
                Empty...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default List;
