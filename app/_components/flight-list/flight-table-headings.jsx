import React from "react";

function FlightTableHeadings() {
  return (
    <div className="container m-auto grid grid-cols-9">
      <div className="col-span-1"></div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <h1>Date & Time</h1>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <h1>Total Travel Duration</h1>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <h1>Airports</h1>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-1">
        <h1>Ticket Price</h1>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default FlightTableHeadings;
