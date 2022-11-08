import React, { useEffect, useState } from "react";
import searchIcon from "./../../assets/icons/Search.png";

function Search({ placeholder, onChange }) {
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    if (searchTerm == null) return;
    const delayDebounceFn = setTimeout(() => {
      onChange(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="search">
      <div className="search-input">
        <img src={searchIcon} alt="error" />
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;
