import React from "react";
import { FlightDataType } from "../Types";
import { RouteComponentProps, withRouter } from "react-router";

export interface FlightItemProps {
  flight: FlightDataType;
  flightIndex: number;
}

export interface ExtendedProps extends FlightItemProps, RouteComponentProps {}

function FlightItem(props: ExtendedProps) {
  const { flight, flightIndex } = props;

  // TODO: SORT FLIGHTS BY TIME (EARLIEST TO LATEST)

  // TODO: ON CLICK FUNCTION - TAKES YOU TO INFO SCREEN - NEW ROUTE IN APP

  return (
    <div
      onClick={() => {
        console.log("CLICKED");

        console.log("HISTORY: ", props.history);

        props.history.push({
          pathname: `/flights/${flightIndex}`,
          state: { flightItem: flight }
        });
      }}
    >
      <p>{flight.Airline}</p>
      <p>{flight.Time}</p>
      <p>{flight.FlightNo}</p>
      {flight.FlightNo !== flight.ParentFlight && <p>{flight.ParentFlight}</p>}
      <p>{flight.PortOfCallA}</p>
      {flight.Gate.length > 0 ? <p>{flight.Gate}</p> : <p>---</p>}
      <p>{flight.Status}</p>
      {flight.OtherInfo.length > 0 ? <p>{flight.OtherInfo}</p> : <p>$$$$</p>}
      {flight.Additional.length > 0 ? <p>{flight.Additional}</p> : <p>@@@@@</p>}
      {flight.ArrHall.length > 0 ? <p>{flight.ArrHall}</p> : <p>!!!!!</p>}
      <p>-----------------------</p>
    </div>
  );
}

export default withRouter(FlightItem);
