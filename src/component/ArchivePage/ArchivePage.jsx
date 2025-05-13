import React from 'react';
import "./ArchivePageStyle.scss";

// Import Component
import Filter from "./Filter/Filter";
import CustomInput from "../All Item/CustomInput/CustomInput";
const ArchivePage = () => {
    return (
        <div className="Archive-Page-Background">
            <Filter/>
            <CustomInput/>
        </div>
    );
};

export default ArchivePage;