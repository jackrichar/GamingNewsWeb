import React from "react";
import "./ArchivePageStyle.scss";

// Import Component
import Filter from "./Filter/Filter";
import PaginatedItems from "../All Item/PaginatedItems/PaginatedItems";
import SearchData from "../../Assets/jsone/Search.json";
const ArchivePage = () => {
  return (
    <div className="Archive-Page-Background">
        <Filter />
        <PaginatedItems items={SearchData}/>
    </div>
  );
};

export default ArchivePage;
