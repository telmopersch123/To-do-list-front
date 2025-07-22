import React from "react";
import { FaSearch } from "react-icons/fa";
import "./css/Search.css";

const Search = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="search">
      <h2>Pesquisar</h2>
      <div className="input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
