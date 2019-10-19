import React, { useEffect, useState } from "react";
import { FlightDataType, ArrDepType } from "../Types";

export interface FlightItemProps {
  flight: FlightDataType;
}

export default function FlightItem(props: FlightItemProps) {
  const { flight } = props;

  return (
    <div>
      <p>{flight.Airline}</p>
      <p>{flight.Time}</p>
      <p>{flight.FlightNo}</p>
      <p>{flight.ParentFlight}</p>
      <p>{flight.PortOfCallA}</p>
      <p>{flight.Gate}</p>
      <p>{flight.Status}</p>
      <p>{flight.OtherInfo}</p>
      <p>{flight.Additional}</p>
      <p>{flight.ArrHall}</p>
      <p>-----------------------</p>
    </div>
  );
}
