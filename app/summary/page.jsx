"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const Widget = ({ iconSrc, title, children, ...props }) => {
  return (
    <div className="flex flex-row items-start gap-x-12 justify-self-center">
      <Image src={iconSrc} width={100} height={100} alt="Icon Src" {...props} />
      <div className="flex flex-col font-baloo text-[15px]">
        <div className=" text-[25px] font-bold">{title}</div>
        {children}
      </div>
    </div>
  );
};

const formatDate = (originalDate) => {
  const day = originalDate.getDate();
const month = originalDate.getMonth() + 1; // Note: January is 0
const year = originalDate.getFullYear();

// Format the date as "mM/D/YYYY"
const formattedDate = `${year}-${month}-${day}`;

return formattedDate;
}

const Summary = () => {
  const [averagePrice, setAveragePrice] = useState(10.12);
  //const {selectedDepart, selectedArrival} = useAppContext();

  const selectedDepart = {
    "id": 0,
    "departureTime": "09:53 AM",
    "arrivalTime": "09:53 AM",
    "date": "2/9/2024",
    "duration": "7 hr 53 min",
    "airports": "JFK - DFW",
    "price": 198
};

const selectedArrival = {
  "id": 1,
  "departureTime": "09:53 AM",
  "arrivalTime": "09:53 AM",
  "date": "2/17/2024",
  "duration": "7 hr 53 min",
  "airports": "DFW - JFK",
  "price": 198
}

  console.log("Selected Depart:", selectedDepart);
  console.log("Selected Arrival:", selectedArrival)

  useEffect(() => {
    const fetchPrices = async () => {
      const [originAirport, destinationAirport] = selectedDepart.airports.split(" - ");
      const departDate = formatDate(new Date(selectedDepart.date));
      const returnDate = formatDate(new Date(selectedArrival.date));

      console.log("Fetching Response");

      const response = await axios.get(
        `http://127.0.0.1:3000/getavgpricing/${originAirport}/${destinationAirport}/${departDate}/${returnDate}`
      );

      console.log("Response:", response);
      
    };

    fetchPrices();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
      <div className="bg-white rounded-[20px] p-5 w-4/5 h-4/5">
        <div className="text-black text-[55px] font-bold">Summary</div>
        <div className="relative top-12 grid w-4/5 h-4/5 grid-rows-2 grid-cols-2 m-auto p-8">
          <Widget iconSrc="/icons/departure-plane.svg" title="Departure">
            <>
              <div>Locations: {selectedDepart.airports}</div>
              <div className="whitespace-nowrap">Date: {selectedDepart.date} {selectedDepart.departureTime}</div>
              <div>Duration: {selectedDepart.duration}</div>
              <div className="font-medium">Price: ${selectedDepart.price}</div>
            </>
          </Widget>
          <Widget
            iconSrc="/icons/arrival-plane.svg"
            title="Returning"
            height={120}
            width={120}
            className="relative bottom-6"
          >
            <>
              <div>Locations: {selectedArrival.airports}</div>
              <div className="whitespace-nowrap">Date: {selectedArrival.date} {selectedArrival.departureTime}</div>
              <div>Duration: {selectedArrival.duration}</div>
              <div className="font-medium">Price: ${selectedArrival.price}</div>
            </>
          </Widget>
          <Widget iconSrc="/icons/dollar.svg" title="Price">
            <>
              <div>Trip Price: ${selectedDepart.price + selectedArrival.price}</div>
              <div>Average Price ${averagePrice}</div>
              <div className="font-bold text-green-700 text-xl">
                Saved ${15.36}
              </div>
            </>
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default Summary;
