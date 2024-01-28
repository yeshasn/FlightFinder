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
import { useAppContext } from "./context/AppContext";
import { useRouter } from "next/navigation";

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
    <div className="relative w-full h-[4px] bg-[#D4D4D4] rounded-[38px] mb-4">
      <motion.span
        className={`absolute left-0 top-0 h-full rounded-[38px] bg-gradient-to-r from-[#FEECC0] via-[#D1889B] to-[#5E376C]`}
        style={{ width: `${progress}%` }}
        initial={{
          opacity: 0,
          x: -100,
          transition: { delay: 2, duration: 3 },
        }}
        animate={{ opacity: 1, x: 0 }}
      ></motion.span>
    </div>
  );
};

const InfoWidget = ({ title, stepNumber, children }) => {
  return (
    <div className="flex flex-col w-full rounded-[20px] px-11 py-3">
      <div className="font-bold font-baloo text-2xl mb-2">{title}</div>
      <ProgressBar progress={((stepNumber - 1) / 3) * 100} />
      {children}
    </div>
  );
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const { setDepartureLocations, setArrivalLocations } = useAppContext();

  const [departureIsFlexible, setDepartureIsFlexible] = useState(false);
  const [arrivalIsFlexible, setArrivalIsFlexible] = useState(false);

  const [departureDateFlexibility, setDepartureDateFlexibility] = useState(0);
  const [arrivalDateFlexibility, setArrivalDateFlexibility] = useState(0);

  const [selectedDepartureLocation, setSelectedDepartureLocation] =
    useState(null);
  const [selectedArrivalLocation, setSelectedArrivalLocation] = useState(null);

  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);

  const [departureObj, setDepartureObj] = useState(null);
  const [arrivalObj, setArrivalObj] = useState(null);
  console.log("Departure date:", departureDateFlexibility);
  console.log("Arrival date:", arrivalDateFlexibility)

  const router = useRouter();

  const fetchInfo = async () => {
    try {
      const formatDate = (date) => {
        return date.toISOString().split("T")[0];
      };


      const response = await axios.get(
        `http://127.0.0.1:3000/priceinfojson/${selectedArrivalLocation}/${selectedDepartureLocation}/${formatDate(
          selectedDepartureDate
        )}/${formatDate(selectedArrivalDate)}/${parseInt(
          departureDateFlexibility
        )}/${parseInt(
          arrivalDateFlexibility
        )}/${departureIsFlexible}/${arrivalIsFlexible}`
      );


      const { data } = response;

      const formattedDeparture = JSON.parse(data["Departure"]);
      const formattedReturn = JSON.parse(data["Return"]);

      setDepartureLocations(formattedDeparture.slice(0, 5));
      setArrivalLocations(formattedReturn.slice(0, 5));

      router.push("/departing-flights");
    } catch (err) {
      console.log("Error:", err);

      fetchInfo();
    }
  };

  const adjustInputWidth = (input) => {
    // Set the size to the length of the input's value (or placeholder if no value)
    input.style.width =
      (input.value.length || input.placeholder.length) + 2 + "ch";
  };

  return (
    <div>
      <div className="relative flex flex-col items-center p-4 justify-betwee w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-go-to-top animation-delay-2000">
          <div className="text-5xl font-semibold animate-fade-in">Discover</div>
          <div className="text-7xl font-extrabold opacity-0 animate-fade-in animation-delay-1000">
            The World.
          </div>
          <div className="text-xl animate-fade-in opacity-0 animation-delay-1000">
            (With AA)&nbsp;
            <Image
              src="/aa.png"
              width={25}
              height={25}
              alt="American Airlines"
              className="inline"
            />
          </div>
        </div>
        {currentStep === 1 && (
          <div className="absolute top-[35%] flex flex-col w-2/3 bg-white text-black rounded-xl opacity-0 animate-fade-in animation-delay-3000">
            <>
              <InfoWidget stepNumber={1} title="1. Pick Departure Location">
                <InputField onChange={setSelectedDepartureLocation} />
                <div className="flex flex-row justify-between mt-8 text-black">
                  <CheckBox
                    isChecked={departureIsFlexible}
                    setIsChecked={setDepartureIsFlexible}
                    title="Flexible Starting Airport?"
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
              className="absolute top-[35%] translate-x-1/2 flex flex-col m-auto w-2/3  bg-white text-black rounded-xl opacity-0"
              initial={{
                opacity: 0,
                y: 70,
                transition: { delay: 1, duration: 2 },
              }}
              animate={{ opacity: 1, y: 0 }}
            >
              <InfoWidget stepNumber={2} title="2. Pick Destination">
                <InputField onChange={setSelectedArrivalLocation} />
                <div className="flex flex-row justify-between mt-8">
                  <CheckBox
                    isChecked={arrivalIsFlexible}
                    setIsChecked={setArrivalIsFlexible}
                    title="Flexible Arrival Airport?"
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
              className="absolute top-[35%] translate-x-1/2  flex flex-col w-2/3 bg-white text-black rounded-xl opacity-0"
              initial={{
                opacity: 0,
                y: 70,
                transition: { delay: 1, duration: 2 },
              }}
              animate={{ opacity: 1, y: 0 }}
            >
              <InfoWidget stepNumber={3} title="3. Pick Departure Date">
                <div className="w-full h-[100px] font-sans mt-4">
                  <DateTimePicker
                    value={selectedDepartureDate}
                    onChange={setSelectedDepartureDate}
                    placeholder="Select Departure Date"
                    className="w-full h-full"
                    containerClassName="w-full h-full font-baloo font-normal text-4xl"
                  />
                </div>
                <div className="flex flex-row items-center justify-between font-baloo text-[17px] text-black mt-16">
                  <div className="flex items-center gap-x-2">
                    <div>Within</div>
                    <input
                      value={departureDateFlexibility}
                      onChange={(e) => {
                        setDepartureDateFlexibility(e.target.value);
                        adjustInputWidth(e.target);
                      }}
                      onFocus={(e) => {
                        setDepartureDateFlexibility("");
                        adjustInputWidth(e.target);
                      }}
                      placeholder="0"
                      className="p-2 w-auto border-2 border-[#D4D4D4] rounded-md"
                    />
                    <div>Days</div>
                  </div>
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
              className="absolute top-[35%] translate-x-1/2  flex flex-col w-2/3 bg-white text-black rounded-xl opacity-0"
              initial={{
                opacity: 0,
                y: 70,
                transition: { delay: 1, duration: 2 },
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -70,
                transition: { delay: 0, duration: 1 },
              }}
            >
              <InfoWidget stepNumber={4} title="4. Pick Arrival Date">
                <div className="w-full h-[100px] font-sans mt-4">
                  <DateTimePicker
                    value={selectedArrivalDate}
                    onChange={setSelectedArrivalDate}
                    placeholder="Select Arrival Date"
                    className="w-full h-full"
                    containerClassName="w-full h-full font-baloo font-normal text-4xl"
                  />
                </div>
                <div className="flex flex-row items-center justify-between font-baloo text-[17px] text-black mt-16">
                  <div className="flex items-center gap-x-2">
                    <div>Within</div>
                    <input
                      value={arrivalDateFlexibility}
                      onChange={(e) => {
                        setArrivalDateFlexibility(e.target.value);
                        adjustInputWidth(e.target);
                      }}
                      onFocus={(e) => {
                        setArrivalDateFlexibility("");
                        adjustInputWidth(e.target);
                      }}
                      placeholder="0"
                      className="p-2 w-auto border-2 border-[#D4D4D4] rounded-md"
                    />
                    <div>Days</div>
                  </div>
                  <RedButton
                    onClick={() => {
                      setCurrentStep(currentStep + 1);
                      fetchInfo();
                    }}
                  >
                    Confirm
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
