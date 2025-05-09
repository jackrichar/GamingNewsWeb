import React from 'react';
import "./LoadingPageStyle.scss";

const LoadingPage = () => {
    return (
        <div className="Loading-Page-Background">
            <div className="Loading-Page">
                <div className="Loader">
                </div>
                <div className="Loader-Text">
                    <span>در حال بارگذاری</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;