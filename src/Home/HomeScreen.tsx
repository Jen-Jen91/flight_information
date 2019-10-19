import React, { useEffect, useState } from "react";
import { FlightDataType } from "../Types";

export default function HomeScreen() {
  const [allFlights, setAllFlights] = useState<FlightDataType[]>([]);
  const [isError, setIsError] = useState(false);
  const [showDepartures, setShowDepartures] = useState(true);

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
        <p>List Component</p>
      </div>
    </div>
  );
}
