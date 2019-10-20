import React from "react";
import { FlightDataType } from "../Types";

export interface InfoCardProps {
  flight: FlightDataType;
}

export default function InfoCard(props: InfoCardProps) {
  const { flight } = props;

  return (
    <div>
      <p>Info Card</p>
      <p>{flight.Airline}</p>
      <p>{flight.Time}</p>
      <p>{flight.FlightNo}</p>
      {flight.FlightNo !== flight.ParentFlight && <p>{flight.ParentFlight}</p>}
      <p>{flight.PortOfCallA}</p>
      {flight.Gate.length > 0 ? <p>{flight.Gate}</p> : <p>---</p>}
      <p>{flight.Status}</p>
      {flight.OtherInfo.length > 0 ? <p>{flight.OtherInfo}</p> : <p>$$$$</p>}
      {flight.Additional.length > 0 ? <p>{flight.Additional}</p> : <p>@@@@@</p>}
      {flight.ArrHall.length > 0 ? <p>{flight.ArrHall}</p> : <p>!!!!!</p>}
    </div>
  );
}
