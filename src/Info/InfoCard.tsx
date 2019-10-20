import React from "react";
import { FlightDataType } from "../Types";
import styles from "./InfoCard.module.css";

export interface InfoCardProps {
  flight: FlightDataType;
}

export default function InfoCard(props: InfoCardProps) {
  const { flight } = props;

  return (
    <div className={styles.card}>
      <div className={styles.rowHeaders}>
        <p>Airline:</p>
        <p>Time:</p>
        <p>Flight Number:</p>
        <p>From/To:</p>
        <p>Gate:</p>
        <p>Status:</p>
        <p>Info:</p>
        <p>Arrival Hall:</p>
      </div>

      <div className={styles.rowDetails}>
        <div className={styles.airline}>
          <img src={flight.Image} className={styles.image} />
          <p>{flight.Airline}</p>
          <p>{flight.airlineCode}</p>
        </div>

        <p>{flight.Time}</p>

        <div className={styles.number}>
          <p>{flight.FlightNo}</p>
          {flight.FlightNo !== flight.ParentFlight && (
            <p>{flight.ParentFlight}</p>
          )}
        </div>

        <p>{flight.PortOfCallA}</p>
        {flight.Gate.length > 0 ? <p>{flight.Gate}</p> : <p>---</p>}
        <p>{flight.Status}</p>
        {flight.OtherInfo.length > 0 && <p>{flight.OtherInfo}</p>}
        {flight.Additional.length > 0 && <p>{flight.Additional}</p>}
        {flight.ArrHall.length > 0 && <p>{flight.ArrHall}</p>}
      </div>
    </div>
  );
}
