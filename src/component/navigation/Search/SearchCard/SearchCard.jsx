import React from 'react';
import "./SearchCardStyle.scss";

const SearchCard = ({Poster, Title}) => {
    return (
        <div className="Search-Card-Background">
            <div className="Search-Card-Image">
                <img className="Poster" src={Poster} alt="Poster"/>
            </div>
            <div className="Search-Card-Title">
                <span className="Title">{Title}</span>
            </div>
        </div>
    );
};

export default SearchCard;