import React from 'react';
import "./CardStyle.scss";

const Card = ({Poster}) =>{
    return(
        <div className="Card-Background">
            <img className="Card-img" src={Poster} alt=""/>
            <button className="Card-Button">
                <span>جزئیات بیشتر</span>
            </button>
        </div>
    );
};

export default Card;