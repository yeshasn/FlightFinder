"use client";
import React from "react";
import FlightsList from "../_components/flight-list/flights-list";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

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

function ReturningFlights() {
  const router = useRouter();
  console.log("ReturningFlights");

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
          headerText="Top Returning Flights"
          flightsData={flights}
          onSelect={() => router.push("/hotels")}
        />
      </motion.div>
    </div>
  );
}

export default ReturningFlights;
