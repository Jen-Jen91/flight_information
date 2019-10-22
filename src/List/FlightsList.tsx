import React, { useState, useEffect } from "react";
import { FlightDataType } from "../Common/Types";
import FlightItem from "./FlightItem";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./FlightList.module.css";
import FlightsNotFound, {
  FlightsNotFoundProps
} from "../Common/FlightNotFound";

export interface FlightsListProps {
  flights: FlightDataType[];
  isDeparture: boolean;
  dateTime: string;
}

export default function FlightsList(props: FlightsListProps) {
  const { flights, isDeparture, dateTime } = props;

  const [filteredFlights, setFilteredFlights] = useState<FlightDataType[]>([]);
  const [noFlightsText, setNoFlightsText] = useState<FlightsNotFoundProps>({
    headerText: "",
    text: ""
  });

  useEffect(() => setFilteredFlights(flights), [flights]);

  useEffect(() => {
    setNoFlightsText({
      headerText: "There are currently no flights available.",
      text: " Please check again later."
    });
  }, []);

  // Search all flights by airline, flight number, destination/origin, and time
  function searchFlights(searchText: string) {
    const newFiltered = flights.filter(flight =>
      `${flight.Airline} ${flight.FlightNo} ${flight.PortOfCallA} ${flight.Time}`
        .toLocaleUpperCase()
        .includes(searchText.toLocaleUpperCase())
    );

    newFiltered.length === 0 &&
      setNoFlightsText({
        headerText: "Flight cannot be found. ",
        text: "Please search for a different flight."
      });
    setFilteredFlights(newFiltered);
  }

  return (
    <section className={styles.listContainer}>
      <SearchBar search={searchFlights} isDeparture={isDeparture} />

      {filteredFlights.length >= 1 ? (
        <>
          <h3 className={styles.date}>{dateTime}</h3>

          <span className={styles.headerContainer}>
            <h6 className={styles.arrivalHeader}>Airline</h6>
            <h6 className={styles.header}>Time</h6>
            <h6 className={styles.header}>Flight Number</h6>
            <h6 className={styles.header}>{`${
              isDeparture ? "To" : "From"
            }`}</h6>
            <h6 className={styles.header}>{`${
              isDeparture ? "Gate" : "Baggage"
            }`}</h6>
            <h6 className={styles.header}>Status</h6>
          </span>

          {filteredFlights.map((flight, index) => (
            <FlightItem key={index} flight={flight} flightIndex={index} />
          ))}
        </>
      ) : (
        <FlightsNotFound
          headerText={noFlightsText.headerText}
          text={noFlightsText.text}
        />
      )}
    </section>
  );
}
