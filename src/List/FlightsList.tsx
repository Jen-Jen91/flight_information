import React, { useState, useEffect } from "react";
import { FlightDataType } from "../Types";
import FlightItem from "./FlightItem";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./FlightList.module.css";

export interface FlightsListProps {
  flights: FlightDataType[];
  isDeparture: boolean;
}

export default function FlightsList(props: FlightsListProps) {
  const { flights, isDeparture } = props;
  const [filteredFlights, setFilteredFlights] = useState<FlightDataType[]>([]);

  useEffect(() => setFilteredFlights(flights), [flights]);

  function searchFlights(searchText: string) {
    const newFiltered = flights.filter(flight =>
      `${flight.Airline} ${flight.FlightNo} ${flight.PortOfCallA} ${flight.Time}`
        .toLocaleUpperCase()
        .includes(searchText.toLocaleUpperCase())
    );

    setFilteredFlights(newFiltered);
  }

  return (
    <div className={styles.listContainer}>
      <SearchBar search={searchFlights} isDeparture={isDeparture} />

      <div className={styles.headers}>
        <p>Airline</p>
        <p>Time</p>
        <p>Flight Number</p>
        <p>{`${isDeparture ? "To" : "From"}`}</p>
        <p>Gate</p>
        <p>Status</p>
      </div>

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
