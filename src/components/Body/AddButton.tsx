import React from "react";
import { FaPlus } from "react-icons/fa6";

interface AddButtonProps {
  onClickProp: () => void; // Define the type for onClickProp
}

const AddButton: React.FC<AddButtonProps> = ({ onClickProp }) => {
  return (
    <div
      onClick={onClickProp}
      className="flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px]  rounded-full top-[450px] left-[330px] md:top-[493px] md:left-[692px] cursor-pointer absolute"
      style={{ backgroundColor: "rgba(108, 99, 255, 1)" }}
    >
      <FaPlus
        className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
        style={{ color: "rgba(247, 247, 247, 1)" }}
      />
    </div>
  );
};

export default AddButton;
