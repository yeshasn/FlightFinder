"use client";
import React, { useEffect, useState } from "react";
import FlightsList from "../_components/flight-list/flights-list";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
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

function ReturningFlights() {
  const router = useRouter();
  console.log("ReturningFlights");
  const {arrivalLocations, setSelectedArrival} = useAppContext();
  const [formattedReturning, setFormattedReturning] = useState([]);
  const controls = useAnimation();

  console.log("Arrival Locations:", arrivalLocations)

  useEffect(() => {
    if (arrivalLocations) {


      setFormattedReturning(arrivalLocations.map((flightData, index) => {

        const originAirport = flightData["Origin"];
        const destinationAirport = flightData["Destination"];
        const price = flightData["Price ($)"];
        const duration = flightData["Travel Time"];
        const date = new Date(flightData["Arrival datetime"]);
        const departureTimestamp = new Date(flightData["Departure datetime"]);
        const departureTime = departureTimestamp.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const arrivalTime = new Date(
          flightData["Arrival datetime"]
        ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

          // Get the day, month, and year
        const day = date.getDate();
        const month = date.getMonth() + 1; // Note: January is 0
        const year = date.getFullYear();

        // Format the date as "M/D/YYYY"
        const formattedDate = `${month}/${day}/${year}`;

        console.log("Departure Time:", departureTime);
        console.log("Arrival Time:", arrivalTime)

        return {
          id: index,
          departureTime,
          arrivalTime,
          date: formattedDate,
          duration,
          airports: originAirport + " - " + destinationAirport,
          price
        }
      }))
    }
  }, [arrivalLocations]);

  const handleSelect = (flightData) => {
    console.log("Selected Depart:", flightData)

    setSelectedArrival(flightData);

    controls.start({ x: "-5%", transition: { duration: 0.2 } }).then(() => {
      router.push("/summary");
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
          headerText="Top Returning Flights"
          flightsData={formattedReturning}
          onSelect={handleSelect}
        />
      </motion.div>
    </div>
  );
}

export default ReturningFlights;
