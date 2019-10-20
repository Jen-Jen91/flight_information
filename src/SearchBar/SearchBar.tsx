import React, { useState } from "react";

export interface SearchBarProps {
  search: (searchValue: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <input
        placeholder="Search for flights"
        type="search"
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value);
          props.search(e.target.value);
        }}
      />
    </div>
  );
}
