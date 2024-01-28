"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

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

const Summary = () => {
  const [averagePrice, setAveragePrice] = useState(10.12);

  useEffect(() => {
    /*const fetchPrices = async () => {
      const response = await axios.get(
        `http://127.0.0.1:3000/priceinfojson/${selectedArrivalLocation}/${selectedDepartureLocation}/${formatDate(
          selectedDepartureDate
        )}/${formatDate(selectedArrivalDate)}/${parseInt(
          departureDateFlexibility
        )}/${parseInt(
          arrivalDateFlexibility
        )}/${departureIsFlexible}/${arrivalIsFlexible}`
      );
    };*/
    //fetchPrices();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
      <div className="bg-white rounded-[20px] p-5 w-4/5 h-4/5">
        <div className="text-black text-[55px] font-bold">Summary</div>
        <div className="relative top-12 grid w-4/5 h-4/5 grid-rows-2 grid-cols-2 m-auto p-8">
          <Widget iconSrc="/icons/departure-plane.svg" title="Departure">
            <>
              <div>Flight #: {"A2F5GA"}</div>
              <div>Date: 02/22/2024 9:00 AM</div>
              <div>Duration: 5 Hours 12 Minutes</div>
              <div className="font-medium">Price: $5.12</div>
            </>
          </Widget>
          <Widget
            iconSrc="/icons/arrival-plane.svg"
            title="Arrival"
            height={120}
            width={120}
            className="relative bottom-6"
          >
            <>
              <div>Flight #: {"A2F5GA"}</div>
              <div>Date: 02/22/2024 9:00 AM</div>
              <div>Duration: 5 Hours 12 Minutes</div>
              <div className="font-medium">Price: $5.12</div>
            </>
          </Widget>
          <Widget iconSrc="/icons/hotel.svg" title="Competitors">
            <>
              <div>Name: {"Hilton"}</div>
              <div>Checkin: 02/22/2024 9:00 AM</div>
              <div>Checkout: 02/24/2024 5:00 PM</div>
              <div className="font-medium">Price: $5.12</div>
            </>
          </Widget>
          <Widget iconSrc="/icons/dollar.svg" title="Price">
            <>
              <div>Trip Price: $5.12</div>
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
