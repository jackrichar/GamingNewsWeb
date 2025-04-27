import React, {useRef, useEffect} from 'react';
import './SearchStyle.scss';

// Import SVG
import {ReactComponent as CloseIcon} from '../../../Assets/Icon/Close.svg';
import {ReactComponent as SearchIcon} from '../../../Assets/Icon/search.svg';

const Search = ({OpenModal, setOpenModal}) => {
    const ClickOut = useRef(null);

    /////////////////////////////////////////////////////////

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                ClickOut.current &&
                !ClickOut.current.contains(event.target)
            ) {
                setOpenModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpenModal]);

    ////////////////////////////////////////////////////////
    return (
        <div className={`Search-Modal-Background ${OpenModal ? 'Modal-Active' : 'Modal-DeActive'}`}>
            <div className="Search-Modal" ref={ClickOut} >
                <div className="Search-Modal-Close-Icon">
                    <button className="Close-Button" onClick={()=> setOpenModal(false)}>
                        <CloseIcon className="Close-Icon"/>
                    </button>
                </div>
                <div className="Search-Modal-Search-Box">
                    <div className="Search-box-Background">
                        <button>
                            <SearchIcon className="Search-Icon"/>
                        </button>
                        <input type="text" placeholder="جستوجو" />
                    </div>
                </div>
                <div className="Search-Modal-Result-Box">

                </div>
            </div>
        </div>
    );
};

export default Search;