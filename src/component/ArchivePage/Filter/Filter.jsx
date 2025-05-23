import React, { useState } from 'react';
import "./FilterStyle.scss";


// Import SVG
import {ReactComponent as FilterIco} from "../../../Assets/Icon/Filter.svg";
import {ReactComponent as CloseIco} from "../../../Assets/Icon/Clear.svg";
import {ReactComponent as CalendarIco} from "../../../Assets/Icon/Calander.svg";
import {ReactComponent as GenreIco} from "../../../Assets/Icon/GamingControll.svg";
import {ReactComponent as MetacriticIco} from "../../../Assets/Icon/Metacritic.svg";

// Import Component
import CustomDualRange from "../../All Item/CustomDualRange/CustomDualRange";

const Filter = () => {
    const [OnClickFilter, setOnClickFilter] = useState(false);

    const [OnClickCalendar, setOnClickCalendar] = useState(false);
    const [OnClickGenre, setOnClickGenre] = useState(false);
    const [OnClickMeta, setOnClickMeta] = useState(false);

    const DefaultOptions = () =>{
        setOnClickCalendar(false);
        setOnClickGenre(false);
        setOnClickMeta(false);
    }

    return (
        <div className="Archive-Page-Filter-Background">
            <div className="Archive-Page-Filter">
                <button className="Archive-Page-Filter-Logo" onClick={()=>
                {
                    setOnClickFilter(!OnClickFilter);
                    DefaultOptions();
                }}>
                    {OnClickFilter ? <CloseIco/> : <FilterIco/>}
                </button>
                <div className={`Archive-Page-Filter-Item ${OnClickFilter ? 'Show-On-Year-Section' : ""}`}>
                    <button
                        title={"تاریخ"}
                        className="Archive-Page-Filter-Logo"
                        onClick={()=>
                        {
                            setOnClickCalendar(!OnClickCalendar);
                            setOnClickGenre(false);
                            setOnClickMeta(false);
                        }}>
                        {OnClickCalendar ? <CloseIco/> : <CalendarIco/> }
                    </button>
                    <div className={`Filter-Content ${OnClickCalendar ? "Show-On-Year-Filter-Content" : ""}`}>
                        <CustomDualRange MinLabel={"از سال"} MaxLabel={"تا سال"} MaxValue={2025} MinValue={1991}/>
                    </div>
                </div>
                <div className={`Archive-Page-Filter-Item ${OnClickFilter ? 'Show-On-Genre-Section' : ""}`}>
                    <button
                        className="Archive-Page-Filter-Logo"
                        onClick={()=>
                        {
                            setOnClickGenre(!OnClickGenre);
                            setOnClickCalendar(false);
                            setOnClickMeta(false);
                        }}>
                        {OnClickGenre ? <CloseIco/> : <GenreIco/>}
                    </button>
                    <div className="Filter-Content">

                    </div>
                </div>
                <div className={`Archive-Page-Filter-Item ${OnClickFilter ? 'Show-On-Meta-Section' : ""}`}>
                    <button
                        title={"امتیاز بازی"}
                        className="Archive-Page-Filter-Logo"
                        onClick={()=>
                        {
                            setOnClickMeta(!OnClickMeta);
                            setOnClickCalendar(false);
                            setOnClickGenre(false);
                        }}>
                        {OnClickMeta ? <CloseIco/> : <MetacriticIco/>}
                    </button>
                    <div className={`Filter-Content ${OnClickMeta ? "Show-On-Year-Filter-Content" : ""}`}>
                        <CustomDualRange MaxValue={100} MinValue={0}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;