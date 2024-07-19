"use client";
import React, { useEffect, useState } from "react";
import { Task } from "./Body/List";
export interface buttons {
  updateId: number;
  newTodos?: Task[];
  onClose: () => void;
  onUpdate: (updatedTodo: Task) => void;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const UpdateModal: React.FC<buttons> = ({
  updateId,
  newTodos,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<number>(0);
  // const [updatedTask, setUpdatedTask] = useState<Task[]>([]);

  useEffect(() => {
    if (newTodos) {
      const task = newTodos.find((task) => task.id === updateId);
      // console.log(task?.id);
      setTitle(task?.title || "");
      setCompleted(task?.completed || false);
      setTaskId(task?.id || 0);
    }
  }, [newTodos]);
  const outsideFormClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;
    if (id === "wrapper") onClose();
  };

  const handleFormClick = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault(); //prevent default alone cant stop the event propagation entirely so click event continues to propagate up to the parent div with id 'wrapper'
    e.stopPropagation(); // Stop event propagation here
  };

  const handleUpdate = () => {
    const updatedTodo: Todo = {
      userId: 11,
      id: taskId,
      title: title,
      completed: completed,
    };
    if (!title) {
      alert("Note is empty");
      return;
    }
    onUpdate(updatedTodo);
    const existingTodosJSON = localStorage.getItem("newTask");
    if (existingTodosJSON) {
      let existingTodos: Todo[] = JSON.parse(existingTodosJSON);

      // finds index of the todo to update
      const index = existingTodos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      if (index !== -1) {
        // Update the todo in the existingTodos array
        existingTodos[index] = updatedTodo;

        // Save back to localStorage
        localStorage.setItem("newTask", JSON.stringify(existingTodos));

        // Optionally, notify user or perform any other actions upon successful update
        // console.log("Todo updated successfully");

        // Close the modal
        onClose();
      } else {
        console.error(
          `Todo with id ${updatedTodo.id} not found in localStorage`
        );
      }
    } else {
      console.error("No todos found in localStorage");
    }
  };
  return (
    <div
      id="wrapper"
      onClick={outsideFormClose}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white dark:bg-gray-900 w-[350px] h-[250px] md:w-[500px] md:h-[289px] border rounded-[16px] flex justify-center">
        <form className=" m-1 pb-12" onClick={handleFormClick} action="">
          <div className=" m-4 pb-12">
            <div className="mb-5 flex justify-center items-center">
              <h1 className=" w-[120px] h-[15px] md:w-[116px] md:h-[24px]  font-kanit font-bold text-center dark:text-white text-gray-700">
                UPDATE NOTE
              </h1>
            </div>
            <input
              className="border w-[310px] h-[30px] md:w-[440px] md:h-[38px] mb-2 outline-none rounded-[5px] px-[8px] py-[16px] dark:text-white dark:bg-gray-900"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ borderColor: "rgba(108, 99, 255, 1)" }}
              required
            />
            <select
              value={completed ? "completed" : "incompleted"}
              onChange={(e) => setCompleted(e.target.value === "completed")}
            >
              <option value="incompleted">Incompleted</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-between  m-4 mt-5  md:m-4 md:mt-10">
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
