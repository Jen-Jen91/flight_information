import React, { useState, useEffect } from "react";
import { FlightDataType } from "../Types";
import FlightItem from "./FlightItem";
import SearchBar from "../SearchBar/SearchBar";

export interface FlightsListProps {
  flights: FlightDataType[];
}

export default function FlightsList(props: FlightsListProps) {
  const { flights } = props;
  const [filteredFlights, setFilteredFlights] = useState<FlightDataType[]>([]);
  // const [flightNotFound, setFlightNotFound] = useState(false);

  useEffect(() => setFilteredFlights(flights), [flights]);

  function searchFlights(searchText: string) {
    console.log("STRING: ", searchText);
    const newFiltered = flights.filter(flight =>
      `${flight.Airline} ${flight.FlightNo} ${flight.PortOfCallA}`
        .toLocaleUpperCase()
        .includes(searchText.toLocaleUpperCase())
    );

    // if (newFiltered.length === 0) {
    //   setFlightNotFound(true);
    // }

    setFilteredFlights(newFiltered);
  }

  return (
    <div>
      <SearchBar search={searchFlights} />

      {filteredFlights.length >= 1 ? (
        filteredFlights.map((flight, index) => {
          return <FlightItem key={index} flight={flight} flightIndex={index} />;
        })
      ) : (
        <p>Flight cannot be found</p>
      )}
    </div>
  );
}
