import Image from "next/image";
import React from "react";

const Widget = ({ iconSrc, title, children }) => {
  return (
    <div className="flex flex-row gap-x-12 w-[530px]">
      <Image src={iconSrc} width={100} height={100} alt="Icon Src" />
      <div className="flex flex-col font-baloo text-[30px]">
        <div className=" text-[45px] font-bold">{title}</div>
        {children}
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <div className="bg-white w-4/5 h-4/5 grid grid-rows-2 grid-cols-2 rounded-[20px] p-5">
        <Widget iconSrc="/icons/departure-plane.svg" title="Departure">
          <>
            <div>Flight #: {"A2F5GA"}</div>
            <div>Date: 02/22/2024 9:00 AM</div>
            <div>Duration: 5 Hours 12 Minutes</div>
            <div className="font-medium">Price: $5.12</div>
          </>
        </Widget>
        <Widget iconSrc="/icons/departure-plane.svg" title="Arrival">
          <>
            <div>Flight #: {"A2F5GA"}</div>
            <div>Date: 02/22/2024 9:00 AM</div>
            <div>Duration: 5 Hours 12 Minutes</div>
            <div className="font-medium">Price: $5.12</div>
          </>
        </Widget>
        <Widget iconSrc="/icons/departure-plane.svg" title="Hotel">
          <>
            <div>Name: {"Hilton"}</div>
            <div>Checkin: 02/22/2024 9:00 AM</div>
            <div>Checkout: 02/24/2024 5:00 PM</div>
            <div className="font-medium">Price: $5.12</div>
          </>
        </Widget>
        <Widget iconSrc="/icons/departure-plane.svg" title="Price">
          <>
            <div>Name: {"Hilton"}</div>
            <div>Checkin: 02/22/2024 9:00 AM</div>
            <div>Checkout: 02/24/2024 5:00 PM</div>
            <div className="font-medium">Price: $5.12</div>
          </>
        </Widget>
      </div>
    </div>
  );
};

export default Summary;
