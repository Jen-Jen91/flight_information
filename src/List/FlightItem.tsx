import React from "react";
import { FlightDataType } from "../Common/Types";
import { RouteComponentProps, withRouter } from "react-router";
import styles from "./FlightItem.module.css";

export interface FlightItemProps {
  flight: FlightDataType;
  flightIndex: number;
}

export interface ExtendedProps extends FlightItemProps, RouteComponentProps {}

function FlightItem(props: ExtendedProps) {
  const { flight, flightIndex } = props;

  return (
    <section
      className={styles.singleFlightContainer}
      onClick={() => {
        props.history.push({
          pathname: `/flights/${flightIndex}`,
          state: { flightItem: flight }
        });
      }}
    >
      <img
        src={flight.Image}
        className={styles.image}
        aria-label={flight.Airline}
        alt={`Airline logo: ${flight.Airline}`}
      />

      <p className={styles.columnDetail}>{flight.Time}</p>

      <span className={styles.doubleColumn}>
        <p className={styles.columnDetail}>{flight.FlightNo}</p>
        {flight.FlightNo !== flight.ParentFlight && (
          <p className={styles.columnDetail}>{flight.ParentFlight}</p>
        )}
      </span>

      <p className={styles.columnDetail}>{flight.PortOfCallA}</p>

      <p className={styles.columnDetail}>
        {flight.Gate.length > 0 ? flight.Gate : flight.Additional}
      </p>

      <span className={styles.doubleColumn}>
        <p className={styles.columnDetail}>{flight.Status}</p>

        {flight.OtherInfo.length > 0 && (
          <p className={styles.columnDetail}>{flight.OtherInfo}</p>
        )}
      </span>
    </section>
  );
}

export default withRouter(FlightItem);
