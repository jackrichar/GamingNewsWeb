import React, {useRef, useEffect, useState} from 'react';
import './SearchStyle.scss';

// Import SVG
import {ReactComponent as CloseIcon} from '../../../Assets/Icon/Close.svg';
import {ReactComponent as SearchIcon} from '../../../Assets/Icon/search.svg';

const Search = ({OpenModal, setOpenModal}) => {
    const [Empty, setEmpty] = useState(false);
    const [Value, setValue] = useState('');
    /////////////////////////////////////////////////////////
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
    useEffect(()=>{
        if (Value === "") {
            setEmpty(true);
        }else if(Value !== "") {
            setEmpty(false);
        }
    }, [Value]);
    useEffect(() => {
        if(!OpenModal){
            setValue("");
        }
    }, [OpenModal]);
    ////////////////////////////////////////////////////////

    // HTML
    return (
        <div className={`Search-Modal-Background ${OpenModal ? 'Modal-Active' : 'Modal-DeActive'}`}>
            <div className="Search-Parent">
                <div className={`Search-box-Background ${!Empty ? "Change-Search-Box" : ""}`} ref={ClickOut}>
                    <button>
                        <SearchIcon className="Search-Icon"/>
                    </button>
                    <input
                        type="search"
                        placeholder="جستوجو"
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        value={Value}
                    />
                </div>
                <div className={`Search-Result-Box ${!Empty ? "Show-Result-Box" : ""}`}>

                </div>
            </div>
        </div>
    );
};

export default Search;