import React from "react";
import { FlightDataType } from "../Types";
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
    <div
      className={styles.container}
      onClick={() => {
        console.log("CLICKED");

        console.log("HISTORY: ", props.history);

        props.history.push({
          pathname: `/flights/${flightIndex}`,
          state: { flightItem: flight }
        });
      }}
    >
      <img src={flight.Image} className={styles.image} />

      <p className={styles.columnDetail}>{flight.Time}</p>

      <div className={styles.doubleColumn}>
        <p className={styles.columnDetail}>{flight.FlightNo}</p>
        {flight.FlightNo !== flight.ParentFlight && (
          <p className={styles.columnDetail}>{flight.ParentFlight}</p>
        )}
      </div>

      <p className={styles.columnDetail}>{flight.PortOfCallA}</p>
      {flight.Gate.length > 0 ? (
        <p className={styles.gateDetail}>{flight.Gate}</p>
      ) : (
        <p className={styles.gateDetail}>{flight.Additional}</p>
      )}

      <div className={styles.doubleColumn}>
        <p className={styles.columnDetail}>{flight.Status}</p>
        {flight.OtherInfo.length > 0 && (
          <p className={styles.columnDetail}>{flight.OtherInfo}</p>
        )}
      </div>
    </div>
  );
}

export default withRouter(FlightItem);
