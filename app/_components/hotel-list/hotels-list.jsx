import React from "react";
import SortButton from "../sort-button";
import { HotelItem } from "./hotel-item";
import HotelTableHeadings from "./hotel-table-headings";

function FlightsList({ headerText, hotelsData, onSelect }) {
  return (
    <div
      className=" flex-col bg-white rounded-lg p-10"
      style={{ width: "85vw", height: "85vh" }}
    >
      <div className="flex flex-row pb-20 justify-between">
        <div className="text-5xl font-semibold font-baloo text-black">
          {headerText}{" "}
        </div>
        <SortButton>Sort by: Price</SortButton>
      </div>
      <HotelTableHeadings />
      <div className="h-0.5 bg-[#D9D9D9] rounded-sm"></div>
      {hotelsData.map((hotel) => (
        <HotelItem key={hotel.id} hotel={hotel} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default FlightsList;
