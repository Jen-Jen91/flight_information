import React, { useEffect, useState } from "react";
import { FlightDataType, ArrDepType } from "../Types";
import FlightItem from "./FlightItem";

export interface FlightsListProps {
  flights: FlightDataType[];
}

export default function FlightsList(props: FlightsListProps) {
  const { flights } = props;

  return (
    <div>
      {flights.length > 0 &&
        flights.map(flight => {
          return <FlightItem flight={flight} />;
        })}
    </div>
  );
}
