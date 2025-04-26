import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import searchData from "../../Assets/jsone/Search.json"; // مسیر فایل JSON

// Import Sass
import "./SearchBoxStyle.scss";

function SearchBox() {
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  return (
    <div className="SearchBox">
      <ReactSearchAutocomplete
        items={searchData} // استفاده از داده‌های JSON
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autoFocus
        placeholder="جستجو..."
      />
    </div>
  );
}

export default SearchBox;
