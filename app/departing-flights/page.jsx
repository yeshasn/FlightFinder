"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import FlightsList from "../_components/flight-list/flights-list";
import { useAppContext } from "../context/AppContext";

// Sample data structure for flights, which should ideally come from a state or props
const flights = [
  {
    id: 1,
    departureTime: "4:30 PM",
    arrivalTime: "1:00 AM",
    date: "8/27/2024",
    duration: "7 hr 30 min",
    airports: "DFW - PAR",
    price: "$487",
  },
  {
    id: 2,
    departureTime: "4:13 PM",
    arrivalTime: "1:00 AM",
    date: "9/12/2024",
    duration: "8 hr 7 min",
    airports: "PAR - DFW",
    price: "$487",
  },
  {
    id: 3,
    departureTime: "4:13 PM",
    arrivalTime: "1:00 AM",
    date: "9/12/2024",
    duration: "8 hr 7 min",
    airports: "PAR - DFW",
    price: "$487",
  },
  {
    id: 4,
    departureTime: "4:13 PM",
    arrivalTime: "1:00 AM",
    date: "9/12/2024",
    duration: "8 hr 7 min",
    airports: "PAR - DFW",
    price: "$487",
  },
];

// FlightItem component

// FlightList component
export default function FlightList() {
  const router = useRouter();
  const { departureLocations } = useAppContext();
  const controls = useAnimation();

  console.log("Departure Locations: ", departureLocations);

  const handleSelect = () => {
    controls.start({ x: "-5%", transition: { duration: 0.2 } }).then(() => {
      router.push("/returning-flights");
      controls.start({ x: "0%", transition: { duration: 0.2 } });
    });
  };

  return (
    <div className="flex flex-col items-center p-4 justify-center w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
      <motion.div
        className="flex flex-col items-center p-4 justify-center w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]"
        initial={{ opacity: 0.2, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0.2, x: -70 }}
        transition={{ duration: 0.5 }}
      >
        <FlightsList
          headerText="Top Departing Flights"
          flightsData={flights}
          onSelect={handleSelect}
        />
      </motion.div>
    </div>
  );
}
