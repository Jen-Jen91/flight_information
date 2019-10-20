import React, { useEffect, useState } from "react";
import { FlightDataType, ArrDepType } from "../Types";
import FlightsList from "../List/FlightsList";

export default function HomeScreen() {
  const [allFlights, setAllFlights] = useState<FlightDataType[]>([]);
  const [isError, setIsError] = useState(false);
  const [showDepartures, setShowDepartures] = useState(true);

  // TODO: REFRESH BUTTON FUNCTION

  // TODO: INTERVAL FUNCTION - FETCH DATA EVERY MINUTE (MAKE SURE FIRST RENDER ISN'T EMPTY ARRAY)

  // TODO: ADD CLEANUP TO USE EFFECT

  useEffect(() => {
    // let intervalId: NodeJS.Timeout | null = null;
    const fetchData = async () => {
      try {
        // intervalId = setInterval(async () => {
        const resp = await fetch(
          "https://kabrudle.edinburghairport.com/api/flights/all"
        );
        const flightsData: FlightDataType[] = await resp.json();

        setAllFlights(flightsData);
        // }, 60000);
      } catch (e) {
        console.log(e);
        setIsError(true);
      }
    };
    fetchData();
    setShowDepartures(true);
    // return () => {
    //   intervalId && clearInterval(intervalId);
    // };
  }, []);

  function splitFlights() {
    const arrivalFlights: FlightDataType[] = [];
    const departureFlights = allFlights.filter(flight => {
      if (flight.ArrDep === ArrDepType.ARRIVAL) {
        arrivalFlights.push(flight);
      } else {
        return flight;
      }
    });

    return showDepartures ? departureFlights : arrivalFlights;
  }

  console.log("ALL FLIGHTS: ", allFlights);

  return (
    <div>
      <p>Live {showDepartures ? "Departures" : "Arrivals"}</p>
      <button>Refresh</button>

      {isError && (
        <p>Something went wrong! Please refresh the page to see our flights.</p>
      )}

      <div>
        <p onClick={() => setShowDepartures(false)}>Arrivals Tab</p>
        <p onClick={() => setShowDepartures(true)}>Departures Tab</p>

        <div>
          <FlightsList flights={splitFlights()} />
        </div>
      </div>
    </div>
  );
}
