import React, { useState } from "react";
import { FlightDataType, ArrDepType } from "../Types";
import styles from "./InfoCard.module.css";

export interface InfoCardProps {
  flight: FlightDataType;
}

export default function InfoCard(props: InfoCardProps) {
  const { flight } = props;

  const isDeparture = flight.ArrDep === ArrDepType.DEPARTURE;

  return (
    <div className={styles.card}>
      <div className={styles.rowHeaders}>
        <p className={styles.detailHeader}>Airline:</p>
        <p className={styles.detailHeader}>Time:</p>
        <p className={styles.detailHeader}>Flight Number:</p>
        <p className={styles.detailHeader}>
          {`${isDeparture ? "To" : "From"}`}:
        </p>
        {isDeparture && <p className={styles.detailHeader}>Gate:</p>}
        <p className={styles.detailHeader}>Status:</p>
        <p className={styles.detailHeader}>Info:</p>
        {!isDeparture && <p className={styles.detailHeader}>Arrival Hall:</p>}
      </div>

      <div className={styles.rowDetails}>
        <div className={styles.airline}>
          <img src={flight.Image} className={styles.image} />
          <p className={styles.detail}>{flight.airlineCode}</p>
          <p className={styles.detail}>{flight.Airline}</p>
        </div>

        <p className={styles.detail}>{flight.Time}</p>

        <div className={styles.number}>
          <p className={styles.detail}>{flight.FlightNo}</p>
          {flight.FlightNo !== flight.ParentFlight && (
            <p className={styles.detail}>{flight.ParentFlight}</p>
          )}
        </div>

        <p className={styles.detail}>{flight.PortOfCallA}</p>
        {isDeparture && <p>{flight.Gate}</p>}
        <p className={styles.detail}>{flight.Status}</p>
        {flight.OtherInfo.length > 0 && (
          <p className={styles.detail}>{flight.OtherInfo}</p>
        )}
        {flight.Additional.length > 0 && (
          <p className={styles.detail}>{flight.Additional}</p>
        )}
        {!isDeparture && <p className={styles.detail}>{flight.ArrHall}</p>}
      </div>
    </div>
  );
}
