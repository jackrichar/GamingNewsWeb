import React, {useRef, useEffect, useState} from 'react';
import './SearchStyle.scss';

// Import SVG
import {ReactComponent as SearchIcon} from '../../../Assets/Icon/search.svg';

// Import Component
import SearchCard from './SearchCard/SearchCard';

// Import Json
import SearchData from '../../../Assets/jsone/Search.json';

const Search = ({OpenModal, setOpenModal}) => {
    const [Result, setResult] = useState([]);
    /////////////////////////////////////////////////////////
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
    useEffect(() => {
        if(!OpenModal){
            setValue("");
        }
    }, [OpenModal]);
    useEffect(() => {
        if (OpenModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // cleanup
        };
    }, [OpenModal]);
    useEffect(()=>{
        if (Value === "") {
            setEmpty(true);
        }else if(Value !== "") {
            setEmpty(false);
        }
    }, [Value]);
    useEffect(() => {
        if (Value.trim() === "") {
            setResult([]);
            return;
        }

        const filtered = SearchData.filter((item) =>
            item.Title.toLowerCase().includes(Value.toLowerCase())
        );
        setResult(filtered);
    }, [Value]);
    ////////////////////////////////////////////////////////

    // HTML
    return (
        <div className={`Search-Modal-Background ${OpenModal ? 'Modal-Active' : 'Modal-DeActive'}`}>
            <div className="Search-Parent" ref={ClickOut}>
                <div className={`Search-box-Background ${!Empty && Result.length > 0 ? "Change-Search-Box" : ""}`}>
                    <button>
                        <SearchIcon className="Search-Icon"/>
                    </button>
                    <input
                        type="search"
                        placeholder="جستجو"
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        value={Value}
                    />
                </div>
                <div className={`Search-Result-Box-Background`}>
                    <div className={`Search-Result-Box ${!Empty && Result.length > 0 ? "Show-Result-Box" : ""}`}>
                        {
                            Value.trim() !== "" ? Result.map((item, index) => (
                                Result.length > 0 ? <SearchCard key={index} Title={item.Title} Poster={item.Poster} /> : null
                            )) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;