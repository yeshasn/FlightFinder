"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const Widget = ({ iconSrc, title, children, className, ...props }) => {
  return (
    <div className={"flex flex-row items-start gap-x-12 justify-self-center " + className}>
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
  const {selectedDepart, selectedArrival} = useAppContext();
  const [comp, setComp] = useState(false);


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

        const results = response.data.response;

      setComp(results);
      
    };

    fetchPrices();
  }
    , []);
  
    const formattedComp = comp ? comp.replace(/\n/g, '<br />') : "";

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
      <div className="relative bg-white rounded-[20px] p-5 w-4/5 h-4/5">
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
          <Widget iconSrc="/icons/dollar.svg" title="Competitor Prices" className="col-span-2">
            <>
              <div className="font-normal" dangerouslySetInnerHTML={{ __html: formattedComp }}></div>
            </>
          </Widget>

        </div>
            
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-2xl text-green-700">Trip Price with American Airlines: ${selectedDepart.price + selectedArrival.price}</div>
            
      </div>
    </div>
  );
};

export default Summary;
