import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { FlightDataType, ArrDepType } from "../Common/Types";
import InfoCard from "./InfoCard";
import styles from "./InfoScreen.module.css";

function InfoScreen(props: RouteComponentProps<{ index?: string }>) {
  const FLIGHT: FlightDataType = props.location.state["flightItem"];

  // TODO: ROUTE STATE - GO BACK AND SHOW DEPS/ARRIVALS - CHANGE HOMESCREEN TOO

  return (
    <div className={styles.infoScreen}>
      <div className={styles.header}>
        <h1>{`Flight ${FLIGHT.FlightNo} ${
          FLIGHT.ArrDep === ArrDepType.ARRIVAL ? "from" : "to"
        } ${FLIGHT.PortOfCallA}`}</h1>

        <h3 onClick={() => props.history.push("/")}>Back</h3>
      </div>

      <InfoCard flight={FLIGHT} />

      <h3 onClick={() => props.history.push("/")}>Back to All Flights</h3>
    </div>
  );
}

export default withRouter(InfoScreen);
