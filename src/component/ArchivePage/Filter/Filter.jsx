import React from 'react';
import "./FilterStyle.scss";

// Import Component

import CustomSelectBox from "../../All Item/CustomSelectBox/CustomSelectBox";

// Import SVG
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
                        Value={["RPG", "Fighting", "Simulation", "Puzzle", "Sports", "Adventure", "Platformer", "Sandbox", "Shooter", "Survival horror"]}
                        onChange={HandleSelect}
                        Multiple={true}
                    />
                </div>
                <div className="Archive-Page-Filter-Item">
                    <CustomSelectBox
                        Placeholder={"سال انتشار"}
                        Value={["1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008"]}
                        onChange={HandleSelect}
                        Multiple={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;