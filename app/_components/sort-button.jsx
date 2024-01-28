import React from "react";

const SortButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#E63860] hover:bg-white hover:text-[#E63860] rounded-[12px] px-9 py-2 font-baloo text-[26px] w-max text-white self-end duration-300"
    >
      {children}
    </button>
  );
};

export default SortButton;
