import React, { useState } from "react";
export interface buttons {
  onClose: () => void;
  onApply: (newTodo: Todo) => void;
  userID :number;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Modal: React.FC<buttons> = ({ onClose, onApply, userID }) => {
  const [title, setTitle] = useState("");
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

  const handleApply = () => {
    const newTodo: Todo = {
      userId: userID,
      id: Math.floor(Math.random() * 1000000),
      title: title,
      completed: false,
    };
    console.log(userID);
    if (!title) {
      alert("Note is empty");
      return;
    }
    onApply(newTodo);
    setTitle("");
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
              <h1 className=" w-[100px] h-[15px] md:w-[116px] md:h-[24px] font-kanit font-bold text-center dark:text-white text-gray-700">
                NEW NOTE
              </h1>
            </div>
            <input
              className="border w-[300px] h-[30px] md:w-[440px] md:h-[38px] outline-none rounded-[5px] px-[8px] py-[16px] dark:text-white dark:bg-gray-900"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your note..."
              style={{ borderColor: "rgba(108, 99, 255, 1)" }}
              required
            />
          </div>
          <div className="flex justify-between m-4 mt-10  md:m-4 md:mt-20">
            <button
              className="flex items-center justify-center w-[100px] h-[30px] md:w-[110px] md:h-[38px] rounded-[5px] border px-[10px] py-[22px] font-kanit font-semibold md:font-bold"
              style={{
                borderColor: "rgba(108, 99, 255, 1)",
                color: "rgba(108, 99, 255, 1)",
              }}
              onClick={() => onClose()}
            >
              CANCEL
            </button>
            <button
              onClick={handleApply}
              className="flex items-center justify-center w-[97px] h-[38px] rounded-[5px] border px-[10px] py-[22px] font-kanit font-semibold md:font-bold text-white"
              style={{
                borderColor: "rgba(108, 99, 255, 1)",
                background: "rgba(108, 99, 255, 1)",
              }}
            >
              APPLY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
