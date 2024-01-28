export function FlightItem({ flightData }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 my-2 rounded-lg shadow">
      <div>
        <div>
          {flightData.departureTime} - {flightData.arrivalTime}
        </div>
        <div>{flightData.date}</div>
      </div>
      <div>{flightData.duration}</div>
      <div>{flightData.airports}</div>
      <div>
        <span>{flightData.price}</span>
        <button className="ml-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
          Select
        </button>
      </div>
    </div>
  );
}
