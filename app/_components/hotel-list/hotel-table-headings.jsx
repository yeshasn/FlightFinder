import React from "react";

function HotelTableHeadings() {
  return (
    <div className="container m-auto grid grid-cols-9">
      <div className="col-span-2"></div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <h1>Hotel Name</h1>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <h1>Booking Site</h1>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <h1>Nightly Price</h1>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-1"></div>
    </div>
  );
}

export default HotelTableHeadings;
