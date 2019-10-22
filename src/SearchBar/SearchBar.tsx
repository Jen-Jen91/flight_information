import React, { useState } from "react";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  search: (searchValue: string) => void;
  isDeparture: boolean;
}

export default function SearchBar(props: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <section className={styles.searchContainer}>
      <input
        type="search"
        className={styles.search}
        placeholder={`Search for ${
          props.isDeparture ? "departures" : "arrivals"
        }...`}
        aria-label="Type to search all flights"
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value);
          props.search(e.target.value);
        }}
      />
    </section>
  );
}
