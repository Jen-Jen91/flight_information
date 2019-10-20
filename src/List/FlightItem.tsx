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

      <p>{flight.Time}</p>

      <div className={styles.doubleColumn}>
        <p>{flight.FlightNo}</p>
        {flight.FlightNo !== flight.ParentFlight && (
          <p>{flight.ParentFlight}</p>
        )}
      </div>

      <p>{flight.PortOfCallA}</p>
      {flight.Gate.length > 0 ? <p>{flight.Gate}</p> : <p>---</p>}

      <div className={styles.doubleColumn}>
        <p>{flight.Status}</p>
        {flight.OtherInfo.length > 0 && <p>{flight.OtherInfo}</p>}
        {/* {flight.Additional.length > 0 && <p>{flight.Additional}</p>}
        {flight.ArrHall.length > 0 && <p>{flight.ArrHall}</p>} */}
      </div>
    </div>
  );
}

export default withRouter(FlightItem);
