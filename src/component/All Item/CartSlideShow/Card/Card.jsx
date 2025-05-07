import React from 'react';
import "./CardStyle.scss";

const Card = () =>{
    return(
        <div className="Card-Background">
            <img className="Card-img" src="https://image.api.playstation.com/vulcan/img/rnd/202106/0722/4MxzDZKZwtEWyMWZghvwd7bQ.jpg" alt=""/>
            <button className="Card-Button">
                <span>جزئیات بیشتر</span>
            </button>
        </div>
    );
};

export default Card;