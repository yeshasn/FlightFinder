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

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const [departureIsFlexible, setDepartureIsFlexible] = useState(false);
  const [arrivalIsFlexible, setArrivalIsFlexible] = useState(false);

  const [departureTimeIsFlexible, setDepartureTimeIsFlexible] = useState(false);
  const [arrivalTimeIsFlexible, setArrivalTimeIsFlexible] = useState(false);

  const [selectedDepartureLocation, setSelectedDepartureLocation] =
    useState(null);
  const [selectedArrivalLocation, setSelectedArrivalLocation] = useState(null);

  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);

  return (
    <div>
      <div className="relative flex flex-col items-center p-4 justify-betwee w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-go-to-top animation-delay-2000">
          <div className="text-5xl font-semibold animate-fade-in">
            Discounted Dreams
          </div>
          <div className="text-7xl font-extrabold opacity-0 animate-fade-in animation-delay-1000">
            Become a Reality
          </div>
        </div>
        {currentStep === 1 && (
          <div className="absolute top-1/4 flex flex-col w-2/3 bg-white text-black rounded-lg opacity-0 animate-fade-in animation-delay-3000">
            <>
              <InfoWidget stepNumber={1} title="1. Pick Departure Location">
                <div className="whitespace-nowrap font-baloo font-semibold text-[40px] mb-4">
                  Which airport are you leaving from?
                </div>
                <InputField onChange={setSelectedDepartureLocation} />
                <div className="font-baloo text-[20px] mt-16">
                  Check the box below to search for cheaper air fares at nearby
                  airports.
                </div>
                <div className="flex flex-row justify-between">
                  <CheckBox
                    isChecked={departureIsFlexible}
                    setIsChecked={setDepartureIsFlexible}
                    title="Flexible Starting Airport"
                  />
                  <RedButton onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                  </RedButton>
                </div>
              </InfoWidget>
            </>
          </div>
        )}
        <AnimatePresence>
          {currentStep === 2 && (
            <motion.div
              className="absolute top-1/4 translate-x-1/2 flex flex-col m-auto w-2/3 bg-white text-black rounded-lg opacity-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <InfoWidget stepNumber={2} title="2. Pick Destination">
                <div className="whitespace-nowrap font-baloo font-semibold text-[40px] mb-4">
                  What is your destination?
                </div>
                <InputField onChange={setSelectedArrivalLocation} />
                <div className="font-baloo text-[20px] mt-16">
                  Check the box below to search for cheaper air fares at nearby
                  airports.
                </div>
                <div className="flex flex-row justify-between">
                  <CheckBox
                    isChecked={arrivalIsFlexible}
                    setIsChecked={setArrivalIsFlexible}
                    title="Flexible Starting Airport"
                  />
                  <RedButton onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                  </RedButton>
                </div>
              </InfoWidget>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {currentStep === 3 && (
            <motion.div
              className="absolute top-1/4 translate-x-1/2  flex flex-col w-2/3 bg-white text-black rounded-lg opacity-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <InfoWidget stepNumber={3} title="3. Pick Departure Date">
                <div className="whitespace-nowrap font-baloo font-semibold text-[40px] mb-4">
                  Enter your intended departure date.
                </div>
                <div className="w-full h-[100px] font-sans">
                  <DateTimePicker
                    value={selectedDepartureDate}
                    onChange={setSelectedDepartureDate}
                    placeholder="Select Departure Date"
                    className="w-full h-full"
                    containerClassName="w-full h-full font-baloo font-normal text-4xl"
                  />
                </div>
                <div className="font-baloo text-[20px] mt-16">
                  Check the box below to search for cheaper air fares at other
                  departure dates.
                </div>
                <div className="flex flex-row justify-between">
                  <CheckBox
                    isChecked={departureTimeIsFlexible}
                    setIsChecked={setDepartureTimeIsFlexible}
                    title="Flexible Date"
                  />
                  <RedButton onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                  </RedButton>
                </div>
              </InfoWidget>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {currentStep === 4 && (
            <motion.div
              className="absolute top-1/4 translate-x-1/2  flex flex-col w-2/3 bg-white text-black rounded-lg opacity-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <InfoWidget stepNumber={4} title="3. Pick Arrival Date">
                <div className="whitespace-nowrap font-baloo font-semibold text-[40px] mb-4">
                  Enter your intended arrival date.
                </div>
                <div className="w-full h-[100px] font-sans">
                  <DateTimePicker
                    value={selectedArrivalDate}
                    onChange={setSelectedArrivalDate}
                    placeholder="Select Arrival Date"
                    className="w-full h-full"
                    containerClassName="w-full h-full font-baloo font-normal text-4xl"
                  />
                </div>
                <div className="font-baloo text-[20px] mt-16">
                  Check the box below to search for cheaper air fares at other
                  arrival dates.
                </div>
                <div className="flex flex-row justify-between">
                  <CheckBox
                    isChecked={arrivalTimeIsFlexible}
                    setIsChecked={setArrivalTimeIsFlexible}
                    title="Flexible Arrival Airport"
                  />
                  <RedButton onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                  </RedButton>
                </div>
              </InfoWidget>
            </motion.div>
          )}
        </AnimatePresence>
        {currentStep === 5 && <LoadingTing />}
      </div>
    </div>
  );
}
