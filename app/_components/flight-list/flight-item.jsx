import RedButton from "../red-button";

export function FlightItem({ flightData, onSelect }) {
  return (
    <div className="container mx-auto grid grid-cols-9 border-b-2 border-[#D9D9D9] py-5 items-center">
      {/* Adjust the size and remove unnecessary classes */}
      <div className="flex pl-4 col-span-1">
        {/* Adjust the image class to fill the container */}
        <img
          src="/aa.png"
          alt="American Airlines"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="text-xl font-baloo text-black col-span-2">
        <div>
          {flightData.departureTime} - {flightData.arrivalTime}
        </div>
        <div className="text-[#868686]">{flightData.date}</div>
      </div>
      <div className="text-xl font-baloo text-black col-span-2">
        <h1>{flightData.duration}</h1>
      </div>
      <div className="text-xl font-baloo text-black col-span-2 ">
        <h1>{flightData.airports}</h1>
      </div>
      <div className="text-xl font-baloo text-black col-span-1">
        <h1>${flightData.price}</h1>
      </div>
      <div className="flex justify-center col-span-1">
        <RedButton className="py-px px-6" onClick={() => onSelect(flightData)}>
          Select
        </RedButton>
      </div>
    </div>
  );
}
