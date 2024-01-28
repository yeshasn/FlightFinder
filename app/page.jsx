"use client";

import DropdownList from "react-widgets/DropdownList";
import airportData from "../public/airport-data";
import Select from "react-select";
import "react-widgets/styles.css";
import { useState } from "react";
import Image from "next/image";

function exampleOnSelect(selected) {
  console.log("selected " + JSON.stringify(selected));
}

function exampleOnSearchTextChange(newText) {
  console.log("search text changed to " + newText);
}

const InputField = () => {
  const [didSelect, setDidSelect] = useState(false);

  return (
    <div className="flex flex-col gap-y-8 py-4">
      <div
        className={`relative flex flex-row items-center gap-x-2.5 left-4 text-4xl text-black`}
      >
        <Image
          src="/icons/departure-plane.svg"
          width={50}
          height={50}
          alt="Departure Icon"
        />
        <div className="self-end">Departing From</div>
      </div>
      <DropdownList
        data={airportData}
        placeholder="Where we going?"
        dataKey={"value"}
        textField={"label"}
        className="border-none border-0 cursor-text"
        containerClassName="bg-red-500 h-[100px] text-4xl border-none cursor-text"
        onFocus={() => setDidSelect(true)}
      />
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center p-4 justify-betwee w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
      <div className="text-center leading-none">
        <div className="text-xl font-semibold">Book Now</div>
        <div className="text-2xl font-extrabold">Plan Later</div>
      </div>
      <div className="flex flex-col m-auto w-2/3 bg-white">
        <div className="relative  aspect-[20/3] text-black rounded-md">
          <InputField />
        </div>
        <button className="self-end bg-white text-black px-8 py-2 rounded-md text-xl">
          Next
        </button>
      </div>
    </div>
  );
}
