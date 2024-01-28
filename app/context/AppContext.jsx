"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
  // children is a prop
  const [departureLocations, setDepartureLocations] = useState(null);
  const [arrivalLocations, setArrivalLocations] = useState(null);
  const [selectedDepart, setSelectedDepart] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);

  const value = {
    departureLocations,
    setDepartureLocations,
    arrivalLocations,
    setArrivalLocations,
    selectedDepart,
    setSelectedDepart,
    selectedArrival,
    setSelectedArrival
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
