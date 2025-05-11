import React from 'react';
import "./FilterStyle.scss";

// Import Component

import CustomSelectBox from "../../All Item/CustomSelectBox/CustomSelectBox";

// Import SVG
import {ReactComponent as ArrowIco} from "../../../Assets/Icon/Arrow.svg";
import {ReactComponent as FilterIco} from "../../../Assets/Icon/Filter.svg";

const Filter = () => {

    const HandleSelect = (value) => {
        console.log(value);
    }

    const HandleSelectCheckBox = (value) => {
        console.log(value);
    }

    return (
        <div className="Archive-Page-Filter-Background">
            <div className="Archive-Page-Filter">
                <div className="Archive-Page-Filter-Logo">
                    <FilterIco/>
                </div>
                <div className="Archive-Page-Filter-Item">
                    <CustomSelectBox
                        Placeholder={"ژانر"}
                        Value={["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller", "Western"]}
                        onChange={HandleSelect}
                        Multiple={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;