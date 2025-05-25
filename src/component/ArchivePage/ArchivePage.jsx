import React, {useState} from "react";
import "./ArchivePageStyle.scss";

// Import Component
import Filter from "./Filter/Filter";
import PaginatedItems from "../All Item/PaginatedItems/PaginatedItems";
import SearchData from "../../Assets/jsone/Search.json";
const ArchivePage = () => {
    const [Year, setYear] = useState({});
    const [MetaPoint,  setMetaPoint] = useState({});
    const [Genres, setGenres] = useState([]);

  return (
    <div className="Archive-Page-Background">
        <Filter setGenres={setGenres} setMetaPoint={setMetaPoint} setYear={setYear} />
        <PaginatedItems Year={Year} Genres={Genres} MetaPoint={MetaPoint} items={SearchData}/>
    </div>
  );
};

export default ArchivePage;
