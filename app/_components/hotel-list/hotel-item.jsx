import RedButton from "../red-button";

export function HotelItem({ hotel, onSelect }) {
  return (
    <div className="container mx-auto grid grid-cols-9 border-b-2 border-[#D9D9D9] py-2 items-center">
      {/* Adjust the size and remove unnecessary classes */}
      <div className="flex pl-4 col-span-2">
        {/* Adjust the image class to fill the container */}
        <img
          src="/stockhotel.jpeg"
          alt="Hotel"
          className="object-contain h-24"
        />
      </div>
      <div className="text-xl font-baloo text-black col-span-2">
        <div>
          <h1>{hotel.name}</h1>
        </div>
      </div>
      <div className="text-xl font-baloo text-black col-span-2">
        <h1>{hotel.bookingSite}</h1>
      </div>
      <div className="text-xl font-baloo text-black col-span-2 ">
        <h1>{hotel.nightlyCost}</h1>
      </div>
      <div className="flex justify-center col-span-1">
        <RedButton className="py-px px-6" onClick={onSelect}>
          Select
        </RedButton>
      </div>
    </div>
  );
}
