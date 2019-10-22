import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { FlightDataType, ArrDepType } from "../Common/Types";
import InfoCard from "./InfoCard";
import styles from "./InfoScreen.module.css";

function InfoScreen(props: RouteComponentProps) {
  const FLIGHT: FlightDataType = props.location.state["flightItem"];

  return (
    <section className={styles.infoScreen}>
      <span className={styles.infoHeaderContainer}>
        <h1 className={styles.infoHeader}>
          {`Flight ${FLIGHT.FlightNo} ${
            FLIGHT.ArrDep === ArrDepType.ARRIVAL ? "from" : "to"
          } ${FLIGHT.PortOfCallA}`}
        </h1>

        <h3 className={styles.back} onClick={() => props.history.push("/")}>
          Back
        </h3>
      </span>

      <InfoCard flight={FLIGHT} />

      <div
        className={styles.viewAllContainer}
        onClick={() => props.history.push("/")}
      >
        <h3 className={styles.viewAll}>View all flights</h3>
      </div>
    </section>
  );
}

export default withRouter(InfoScreen);
