import React from "react";
import styles from "./FlightNotFound.module.css";

export interface FlightsNotFoundProps {
  headerText: string;
  text: string;
}

export default function FlightsNotFound(props: FlightsNotFoundProps) {
  const { headerText, text } = props;

  return (
    <section className={styles.noFlightsContainer}>
      <p className={styles.noFlightsHeaderText}>{headerText}</p>
      <p className={styles.noFlightsText}>{text}</p>
    </section>
  );
}
