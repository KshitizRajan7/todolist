import React, { useState } from "react";
import { headerProp } from "./Head";

const Select: React.FC<headerProp> = ({ onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("All");
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value === "all") {
      onSelect("true"); // Pass 'true' and 'false' when 'all' is selected
      onSelect("false");
    } else {
      onSelect(value);
    }
  };

  return (
    <select
      value={selectedValue}
      onChange={handleSelect}
      className="w-[50px] h-[38px] md:w-[75px] md:h-[38px] rounded-[5px] p-[5px] gap-[10px] text-[11px] bg-transparent border-none text-white outline-none cursor-pointer"
      style={{ backgroundColor: "rgba(108, 99, 255, 1)" }}
      name="status"
      id="status"
    >
      <option value="">ALL</option>
      <option value="true">Completed</option>
      <option value="false">Incompleted</option>
    </select>
  );
};

export default Select;
