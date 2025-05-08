import React from 'react';
import "./LoadingPageStyle.scss";

const LoadingPage = () => {
    return (
        <div className="Loading-Page-Background">
            <div className="loading-container">
                <div className="loader">
                    <div className="spinner"></div>
                    <div className="pulse"></div>
                    <div className="glow"></div>
                </div>
                <h2 className="loading-text">در حال بارگذاری...</h2>
            </div>
        </div>
    );
};

export default LoadingPage;