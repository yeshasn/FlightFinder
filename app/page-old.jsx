"use client";

import DropdownList from "react-widgets/DropdownList";
import airportData from "../public/airport-data";
import Select from "react-select";
import "react-widgets/styles.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { debounce } from "lodash"; // Import debounce from lodash

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import LoadingTing from "./_components/loading";
import RedButton from "./_components/red-button";
import CheckBox from "./_components/check-box";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { Calendar } from "react-modern-calendar-datepicker";
import { DateTimePicker } from "react-widgets";
import axios from "axios";

const InputField = ({ onChange }) => {
  const [didSelect, setDidSelect] = useState(false);

  return (
    <div className="flex flex-col gap-y-8 py-4">
      {false && (
        <Image
          src="/icons/departure-plane.svg"
          width={50}
          height={50}
          alt="Departure Icon"
        />
      )}
      <DropdownList
        data={airportData}
        placeholder="Enter a city name"
        onChange={(val) => onChange(val.value)}
        dataKey={"value"}
        textField={"label"}
        containerClassName="h-[100px] font-baloo font-normal text-4xl cursor-text"
        onFocus={() => setDidSelect(true)}
      />
    </div>
  );
};

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative w-full h-[7px] bg-[#D4D4D4] rounded-[38px] mb-4">
      <span
        className={`absolute left-0 top-0 h-full rounded-[38px] bg-black`}
        style={{ width: `${progress}%` }}
      ></span>
    </div>
  );
};

const InfoWidget = ({ title, stepNumber, children }) => {
  return (
    <div className="flex flex-col w-full rounded-[20px] px-11 py-3">
      <div className="font-bold font-baloo text-[17px]">{title}</div>
      <ProgressBar progress={((stepNumber - 1) / 3) * 100} />
      {children}
    </div>
  );
};

export default async function asHome() {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/priceinfojson`);

    console.log("Response:", response);

    console.log("Data:", data);
  } catch (err) {
    console.log("Error:", err);
  }

  return <div></div>;
}
