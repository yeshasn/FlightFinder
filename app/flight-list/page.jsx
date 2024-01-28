import React from "react";
import SortButton from "../_components/sort-button";
import FlightTableHeadings from "../_components/flight-list/flight-table-headings";
import { FlightItem } from "../_components/flight-list/flight-item";

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
];

// FlightItem component

// FlightList component
export default function FlightList() {
  return (
    <div className="flex flex-col items-center p-4 justify-center w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
      <div
        className=" flex-col bg-white rounded-lg p-10"
        style={{ width: "85vw", height: "85vh" }}
      >
        <div className="flex flex-row pb-8 justify-between">
          <div className="text-5xl font-semibold font-baloo text-black">
            Top Round Trip Flights to Paris{" "}
          </div>
          <SortButton>Sort by: Price</SortButton>
        </div>
        <FlightTableHeadings />
        <div className="h-0.5 bg-[#D9D9D9] rounded-sm"></div>
        {flights.map((flight) => (
          <FlightItem key={flight.id} flightData={flight} />
        ))}
      </div>
    </div>
  );
}
