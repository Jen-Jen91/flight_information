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

        <p onClick={fetchData} className={styles.refresh}>
          Refresh Flights
        </p>
      </div>

      {isError && (
        <p>Something went wrong! Please refresh the page to see our flights.</p>
      )}

      <div className={styles.tabContainer}>
        <div
          onClick={() => setShowDepartures(false)}
          className={showDepartures ? styles.tab : styles.selectedTab}
        >
          <p>Arrivals</p>
        </div>
        <div
          onClick={() => setShowDepartures(true)}
          className={showDepartures ? styles.selectedTab : styles.tab}
        >
          <p>Departures</p>
        </div>
      </div>

      {allFlights.length >= 1 ? (
        <FlightsList
          flights={splitFlights()}
          isDeparture={showDepartures}
          dateTime={allFlights[0].dateTime}
        />
      ) : (
        <p>No flights</p>
      )}
    </div>
  );
}
