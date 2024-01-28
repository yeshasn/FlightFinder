import React from "react";
import { extendTailwindMerge } from "tailwind-merge";

const RedButton = ({ onClick, children, className }) => {
  const combinedClassName = extendTailwindMerge(
    "border border-[#E63860] hover:bg-[#E63860] hover:text-white rounded-[12px] px-9 py-2 font-baloo text-[26px] w-max text-[#E63860] self-end duration-300",
    className
  );

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default RedButton;
