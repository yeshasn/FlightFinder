import RedButton from "../red-button";

export function FlightItem({ flightData }) {
  return (
    <div class="container m-auto grid grid-cols-9">
      <div class="col-span-1"></div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <div>
          {flightData.departureTime} - {flightData.arrivalTime}
        </div>
        <div>{flightData.date}</div>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <h1>{flightData.duration}</h1>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-2">
        <h1>{flightData.airports}</h1>
      </div>
      <div className="text-xl font-medium font-baloo text-[#868686] k col-span-1">
        <h1>{flightData.price}</h1>
      </div>
      <div className=" col-span-1 justify-center">
        <RedButton>Select</RedButton>
      </div>
    </div>
  );
}
