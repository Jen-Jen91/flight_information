import React, { useEffect, useState } from "react";
import { FlightDataType, ArrDepType } from "../Types";
import FlightsList from "../List/FlightsList";
import styles from "./HomeScreen.module.css";

export default function HomeScreen() {
  const [allFlights, setAllFlights] = useState<FlightDataType[]>([]);
  const [isError, setIsError] = useState(false);
  const [showDepartures, setShowDepartures] = useState(true);

  // TODO: LOADING INDICATOR (SET TO FALSE IN USEEFFECT)

  async function fetchData() {
    console.log("FETCH");

    try {
      const resp = await fetch(
        "https://kabrudle.edinburghairport.com/api/flights/all"
      );
      const flightsData: FlightDataType[] = await resp.json();

      setAllFlights(flightsData);
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
  }

  useEffect(() => {
    fetchData();
    setShowDepartures(true);
    const intervalId = setInterval(fetchData, 60000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
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
    <div className={styles.homeScreen}>
      <div className={styles.header}>
        <h1>Live {showDepartures ? "Departures" : "Arrivals"}</h1>

        <button onClick={fetchData}>Refresh</button>
      </div>

      {isError && (
        <p>Something went wrong! Please refresh the page to see our flights.</p>
      )}

      {allFlights.length >= 1 ? (
        <div className={styles.listGrid}>
          <div onClick={() => setShowDepartures(false)} className={styles.tab}>
            <p>Arrivals</p>
          </div>
          <div onClick={() => setShowDepartures(true)} className={styles.tab}>
            <p>Departures</p>
          </div>

          {/* <div> */}
          <FlightsList
            flights={splitFlights()}
            isDeparture={showDepartures}
            dateTime={allFlights[0].dateTime}
          />
          {/* </div> */}
        </div>
      ) : (
        <p>No flights</p>
      )}
    </div>
  );
}
