import Image from "next/image";
import React from "react";

const CheckBox = ({ isChecked, setIsChecked, title }) => {
  return (
    <button
      className={`flex flex-row items-center gap-x-2`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <div
        className={`w-5 h-5 rounded-[4px] ${
          isChecked ? "bg-[#E63860]" : "border-2 border-[#E63860]"
        }`}
      >
        {isChecked && (
          <Image src="/icons/check.svg" width={55} height={55} alt="Check" />
        )}
      </div>
      <div className="font-baloo text-[17px] text-black">{title}</div>
    </button>
  );
};

export default CheckBox;
