"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import HotelsList from "../_components/hotel-list/hotels-list";

// Sample data structure for hotels, which should ideally come from a state or props
const hotelsData = [
  {
    id: 1,
    name: "The Hotel Baby",
    bookingSite: "booking.com",
    nightlyCost: "$487",
    imageUrl: "path-to-hotel-baby-image.jpg", // Replace with actual image path
  },
  {
    id: 2,
    name: "Tariq Hotel",
    bookingSite: "tripadvisor.com",
    nightlyCost: "$487",
    imageUrl: "path-to-tariq-hotel-image.jpg", // Replace with actual image path
  },
  {
    id: 3,
    name: "Yeshas Hotel",
    bookingSite: "expedia.com",
    nightlyCost: "$487",
    imageUrl: "path-to-yeshas-hotel-image.jpg", // Replace with actual image path
  },
  {
    id: 4,
    name: "Rahul Hotel",
    bookingSite: "booking.com",
    nightlyCost: "$487",
    imageUrl: "path-to-rahul-hotel-image.jpg", // Replace with actual image path
  },
  {
    id: 5,
    name: "Ricky Hotel",
    bookingSite: "hotels.com",
    nightlyCost: "$487",
    imageUrl: "path-to-ricky-hotel-image.jpg", // Replace with actual image path
  },
];

export default function FlightList() {
  const router = useRouter();
  const controls = useAnimation();

  const handleSelect = () => {
    controls.start({ x: "-5%", transition: { duration: 0.2 } }).then(() => {
      router.push("/complete");
      controls.start({ x: "0%", transition: { duration: 0.2 } });
    });
  };
  return (
    <div className="flex flex-col items-center p-4 justify-center w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]">
      <motion.div
        className="flex flex-col items-center p-4 justify-center w-screen h-screen font-bogart text-white bg-gradient-to-b from-[#FEECC0] via-[#D1889B] to-[#5E376C]"
        initial={{ opacity: 0.2, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0.2, x: -70 }}
        transition={{ duration: 0.5 }}
      >
        <HotelsList
          headerText="Top Hotels"
          hotelsData={hotelsData}
          onSelect={handleSelect}
        />
      </motion.div>
    </div>
  );
}
