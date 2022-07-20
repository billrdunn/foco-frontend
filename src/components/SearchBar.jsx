import React from "react";
import { useDispatch } from "react-redux";
import { setSearchVal } from "../reducers/searchValReducer";

function SearchBar() {

  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    const searchVal = event.target.value.toLowerCase();
    dispatch(setSearchVal(searchVal));
  };

  return (
    <div>
      Search:
      <form>
        <input id="searchBarInput" onChange={handleSearchChange} />
      </form>
    </div>
  );
}

export default SearchBar;
