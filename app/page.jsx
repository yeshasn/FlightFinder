"use client";

import DropdownList from "react-widgets/DropdownList";
import airportData from "../public/airport-data";
import Select from "react-select";
import "react-widgets/styles.css";
import { useEffect, useState } from "react";
import Image from "next/image";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import LoadingTing from "./_components/loading";

const InputField = () => {
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
        dataKey={"value"}
        textField={"label"}
        className="bg-red-500"
        containerClassName="bg-red-500 h-[100px] text-4xl bg-orange-500 cursor-text"
        style={{ background: "red" }}
        onFocus={() => setDidSelect(true)}
      />
    </div>
  );
};

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative w-full h-[7px] bg-[#D4D4D4] rounded-[38px]">
      <span
        className={`absolute left-0 top-0 h-full rounded-[38px] bg-black`}
        style={{ width: `${progress}%` }}
      ></span>
    </div>
  );
};

const InfoWidget = ({ title, stepNumber, children }) => {
  return (
    <div className="flex flex-col w-2/3 h-2/3 rounded-[20px] px-11 py-3">
      <div className="font-bold font-baloo text-[17px]">{title}</div>
      <ProgressBar progress={((stepNumber - 1) / 3) * 100} />
      {children}
    </div>
  );
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <div className="flex flex-col items-center p-4 justify-betwee w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-go-to-top animation-delay-2000">
          <div className="text-5xl font-semibold animate-fade-in">
            Discounted Dreams
          </div>
          <div className="text-7xl font-extrabold opacity-0 animate-fade-in animation-delay-1000">
            Become a Reality
          </div>
        </div>
        {currentStep === 1 && (
          <div className="flex flex-col m-auto w-2/3 bg-white text-black rounded-lg opacity-0 animate-fade-in animation-delay-3000">
            <>
              <InfoWidget stepNumber={1} title="1. Pick Departure Location">
                <div className="whitespace-nowrap font-baloo font-semibold text-[40px]">
                  Which airport are you leaving from?
                </div>
                <InputField />
              </InfoWidget>
            </>
          </div>
        )}
        <AnimatePresence>
          {currentStep === 2 && (
            <motion.div
              className="flex flex-col m-auto w-2/3 bg-white text-black rounded-lg opacity-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <>
                <div className="relative  aspect-[20/3] text-black rounded-md">
                  <InputField />
                </div>
                <button className="self-end bg-white text-black px-8 py-2 rounded-md text-xl">
                  Next
                </button>
              </>
            </motion.div>
          )}
        </AnimatePresence>
        {currentStep === 3 && <LoadingTing />}

        <button onClick={() => setCurrentStep(currentStep + 1)}>next</button>
      </div>
    </div>
  );
}
