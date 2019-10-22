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
    <div className={styles.listContainer}>
      <SearchBar search={searchFlights} isDeparture={isDeparture} />

      <h3>{dateTime}</h3>

      <div className={styles.headers}>
        <h6 className={styles.arrivalHeader}>Airline</h6>
        <h6>Time</h6>
        <h6 className={styles.flightAndStatusHeader}>Flight Number</h6>
        <h6>{`${isDeparture ? "To" : "From"}`}</h6>
        <h6>{`${isDeparture ? "Gate" : "Baggage"}`}</h6>
        <h6 className={styles.flightAndStatusHeader}>Status</h6>
      </div>

      {filteredFlights.length >= 1 ? (
        filteredFlights.map((flight, index) => {
          return <FlightItem key={index} flight={flight} flightIndex={index} />;
        })
      ) : (
        <FlightsNotFound
          headerText={noFlightsText.headerText}
          text={noFlightsText.text}
        />
      )}
    </div>
  );
}
