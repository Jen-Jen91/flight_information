import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { FlightDataType } from "../Types";

function InfoScreen(props: RouteComponentProps<{ index?: string }>) {
  console.log("ID: ", props.match.params.index);

  const FLIGHT: FlightDataType = props.location.state["flightItem"];

  console.log("STATE: ", FLIGHT.Airline);

  return (
    <div>
      <p>Info Screen</p>
    </div>
  );
}

export default withRouter(InfoScreen);
