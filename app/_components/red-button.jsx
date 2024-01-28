import React from "react";

const RedButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="border border-[#E63860] hover:bg-[#E63860] hover:text-white rounded-[12px] px-9 py-2 font-baloo text-[26px] w-max text-[#E63860] self-end duration-300"
    >
      {children}
    </button>
  );
};

export default RedButton;
