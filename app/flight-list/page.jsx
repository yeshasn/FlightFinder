import React from "react";

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
  // ... other flights
];

// FlightItem component
function FlightItem({ flight }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 my-2 rounded-lg shadow">
      <div>
        <div>
          {flight.departureTime} - {flight.arrivalTime}
        </div>
        <div>{flight.date}</div>
      </div>
      <div>{flight.duration}</div>
      <div>{flight.airports}</div>
      <div>
        <span>{flight.price}</span>
        <button className="ml-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
          Select
        </button>
      </div>
    </div>
  );
}

// FlightList component
export default function FlightList() {
  return (
    <div className="flex flex-col items-center p-4 justify-center w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
      <div
        className="flex flex-col bg-white rounded-lg p-10"
        style={{ width: "85vw", height: "85vh" }}
      >
        <div className="flex-row pb 8">
          <div className="text-5xl font-semibold font-baloo text-black">
            Top Round Trip Flights to Paris{" "}
          </div>
        </div>

        <div className="h-0.5 bg-[#D9D9D9] rounded-sm"></div>
      </div>
    </div>
  );
}
