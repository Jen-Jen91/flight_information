import React, { useEffect, useState } from "react";
import { FlightDataType, ArrDepType } from "../Common/Types";
import FlightsList from "../List/FlightsList";
import Refresh from "../images/refresh.png";
import styles from "./HomeScreen.module.css";
import FlightsNotFound from "../Common/FlightNotFound";

export default function HomeScreen() {
  const [allFlights, setAllFlights] = useState<FlightDataType[]>([]);
  const [showError, setShowError] = useState(false);
  const [showDepartures, setShowDepartures] = useState(true);

  // Fetch API data and set interval to fetch every minute (clear interval on cleanup)
  useEffect(() => {
    fetchData();
    setShowDepartures(true);
    const intervalId = setInterval(fetchData, 60000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  async function fetchData() {
    try {
      const resp = await fetch(
        "https://kabrudle.edinburghairport.com/api/flights/all"
      );
      const flightsData: FlightDataType[] = await resp.json();

      setAllFlights(flightsData);
    } catch (e) {
      setShowError(true);
    }
  }

  // Split all flights into arrivals and departures
  function splitFlights() {
    const arrivalFlights: FlightDataType[] = [];
    const departureFlights: FlightDataType[] = [];

    allFlights.forEach(flight => {
      flight.ArrDep === ArrDepType.ARRIVAL
        ? arrivalFlights.push(flight)
        : departureFlights.push(flight);
    });

    return showDepartures ? departureFlights : arrivalFlights;
  }

  return (
    <section className={styles.homeScreen}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          Live {showDepartures ? "Departures" : "Arrivals"}
        </h1>
        <img
          src={Refresh}
          onClick={fetchData}
          alt="Refresh"
          aria-label="Refresh flights list"
          className={styles.refresh}
        />
      </div>

      <span className={styles.tabContainer}>
        <div
          onClick={() => setShowDepartures(false)}
          className={showDepartures ? styles.tab : styles.selectedTab}
        >
          <p className={styles.tabText}>Arrivals</p>
        </div>
        <div
          onClick={() => setShowDepartures(true)}
          className={showDepartures ? styles.selectedTab : styles.tab}
        >
          <p className={styles.tabText}>Departures</p>
        </div>
      </span>

      {showError ? (
        <FlightsNotFound
          headerText={"Something went wrong :("}
          text={"Please refresh the page to see our flights."}
        />
      ) : (
        <FlightsList
          flights={splitFlights()}
          isDeparture={showDepartures}
          dateTime={allFlights.length > 0 ? allFlights[0].dateTime : ""}
        />
      )}
    </section>
  );
}
