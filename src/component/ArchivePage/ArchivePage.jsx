import React from "react";
import "./ArchivePageStyle.scss";

// Import Component
import Filter from "./Filter/Filter";
import CustomDualRange from "../All Item/CustomDualRange/CustomDualRange";
const ArchivePage = () => {
  return (
    <div className="Archive-Page-Background">
      <Filter />
    </div>
  );
};

export default ArchivePage;
