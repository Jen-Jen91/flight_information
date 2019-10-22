import React from "react";
import { FlightDataType, ArrDepType } from "../Common/Types";
import styles from "./InfoCard.module.css";

export interface InfoCardProps {
  flight: FlightDataType;
}

export default function InfoCard(props: InfoCardProps) {
  const { flight } = props;
  const IS_DEPARTURE = flight.ArrDep === ArrDepType.DEPARTURE;

  return (
    <section className={styles.infoCard}>
      <div className={styles.infoHeaders}>
        <p className={styles.detailHeader}>Airline:</p>
        <p className={styles.detailHeader}>Time:</p>
        <p className={styles.detailHeader}>Flight Number:</p>

        <p className={styles.detailHeader}>
          {`${IS_DEPARTURE ? "To" : "From"}`}:
        </p>

        {IS_DEPARTURE && <p className={styles.detailHeader}>Gate:</p>}

        <p className={styles.detailHeader}>Status:</p>
        <p className={styles.detailHeader}>Info:</p>

        {!IS_DEPARTURE && <p className={styles.detailHeader}>Arrival Hall:</p>}
      </div>

      <div className={styles.infoDetails}>
        <div className={styles.airlineDetail}>
          <img
            src={flight.Image}
            className={styles.image}
            aria-label={flight.Airline}
            alt={`Airline logo: ${flight.Airline}`}
          />
          <p className={styles.detail}>{flight.airlineCode}</p>
          <p className={styles.detail}>{flight.Airline}</p>
        </div>

        <p className={styles.detail}>{flight.Time}</p>

        <div className={styles.flightNumberDetail}>
          <p className={styles.detail}>{flight.FlightNo}</p>
          {flight.FlightNo !== flight.ParentFlight && (
            <p className={styles.detail}>{flight.ParentFlight}</p>
          )}
        </div>

        <p className={styles.detail}>{flight.PortOfCallA}</p>

        {IS_DEPARTURE && <p>{flight.Gate}</p>}

        <p className={styles.detail}>{flight.Status}</p>

        {flight.OtherInfo.length > 0 && (
          <p className={styles.detail}>{flight.OtherInfo}</p>
        )}

        {flight.Additional.length > 0 && (
          <p className={styles.detail}>{flight.Additional}</p>
        )}

        {!IS_DEPARTURE && <p className={styles.detail}>{flight.ArrHall}</p>}
      </div>
    </section>
  );
}
