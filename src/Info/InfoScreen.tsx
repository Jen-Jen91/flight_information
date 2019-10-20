import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { FlightDataType, ArrDepType } from "../Types";
import InfoCard from "./InfoCard";

function InfoScreen(props: RouteComponentProps<{ index?: string }>) {
  const FLIGHT: FlightDataType = props.location.state["flightItem"];

  // TODO: ROUTE STATE - GO BACK AND SHOW DEPS/ARRIVALS - CHANGE HOMESCREEN TOO

  return (
    <div>
      <p>{`Flight ${FLIGHT.FlightNo} ${
        FLIGHT.ArrDep === ArrDepType.ARRIVAL ? "from" : "to"
      } ${FLIGHT.PortOfCallA}`}</p>

      <p onClick={() => props.history.push("/")}>Back</p>

      <InfoCard flight={FLIGHT} />

      <p onClick={() => props.history.push("/")}>Back</p>
    </div>
  );
}

export default withRouter(InfoScreen);
