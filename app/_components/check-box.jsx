import Image from "next/image";
import React from "react";

const CheckBox = ({ isChecked, setIsChecked, title }) => {
  return (
    <button
      className={`flex flex-row items-center gap-x-2`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <div
        className={`w-4 h-4 rounded-[4px] ${
          isChecked ? "bg-blue-500" : "border-2 border-[#DBDBDB]"
        }`}
      >
        {isChecked && (
          <Image src="/icons/check.svg" width={55} height={55} alt="Check" />
        )}
      </div>
      <div className="font-baloo text-[15px] text-[#7B7A7A]">{title}</div>
    </button>
  );
};

export default CheckBox;
