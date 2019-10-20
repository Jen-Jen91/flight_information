import React from "react";
import { FlightDataType } from "../Types";
import FlightItem from "./FlightItem";

export interface FlightsListProps {
  flights: FlightDataType[];
}

export default function FlightsList(props: FlightsListProps) {
  const { flights } = props;

  // TODO: ADD SEARCH BAR COMPONENT (FUNCTION TO SEARCH BY AIRLINE, TO/FROM, FLIGHT NUMBER)

  return (
    <div>
      {flights.length > 0 &&
        flights.map((flight, index) => {
          return <FlightItem key={index} flight={flight} flightIndex={index} />;
        })}
    </div>
  );
}
