import React, { useRef, useEffect, useState } from 'react';
import './SearchStyle.scss';
import { ReactComponent as SearchIcon } from '../../../Assets/Icon/search.svg';
import SearchCard from './SearchCard/SearchCard';
import SearchData from '../../../Assets/jsone/Search.json';

const Search = ({ OpenModal, setOpenModal }) => {
    const ScrollModalRef = useRef(null);
    const InputRef = useRef(null);
    const ResultBoxRef = useRef(null); // Ref برای بخش نتایج
    const [Result, setResult] = useState([]);
    const [Empty, setEmpty] = useState(false);
    const [Value, setValue] = useState('');
    const ClickOut = useRef(null);

    // مدیریت کلیک خارج از مدال
    useEffect(() => {
        function handleClickOutside(event) {
            if (ClickOut.current && !ClickOut.current.contains(event.target)) {
                setOpenModal(false);
                InputRef.current.blur(); // حذف فوکوس از input
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside); // پشتیبانی از لمس
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [setOpenModal]);

    // ریست Value هنگام بسته شدن مدال
    useEffect(() => {
        if (!OpenModal) {
            setValue('');
            InputRef.current?.blur(); // اطمینان از بسته شدن کیبورد
        }
    }, [OpenModal]);

    // غیرفعال کردن اسکرول بدنه هنگام باز بودن مدال
    useEffect(() => {
        document.body.style.overflow = OpenModal ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [OpenModal]);

    // مدیریت Empty و نتایج
    useEffect(() => {
        setEmpty(Value.trim() === '');
        const filtered = SearchData.filter((item) =>
            item.Title.toLowerCase().includes(Value.toLowerCase())
        );
        setResult(filtered);
    }, [Value]);

    // اسکرول به بالا هنگام تغییر Value، اگر input فوکوس دارد
    useEffect(() => {
        const Input = InputRef.current;
        const ScrollModalRef = ResultBoxRef.current;

        if (!Input || !ScrollModalRef) return;

        // بررسی فوکوس
        if (document.activeElement === Input) {
            ScrollModalRef.scrollTop = 0; // اسکرول بخش نتایج به بالا
        }
    }, [Value]);
    
    // مدیریت اسکرول خودکار وقتی کیبورد گوشی فعال می‌شود
    useEffect(() => {
        const Input = InputRef.current;
        
        if (!Input) return;
        
        // وقتی input فوکوس می‌شود
        const handleFocus = () => {
            // تأخیر کوتاه برای اطمینان از باز شدن کیبورد
            setTimeout(() => {
                // اسکرول به موقعیتی که input در دید قرار بگیرد
                Input.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // مدیریت ارتفاع ویوپورت در IOS
                const viewportHeight = window.visualViewport?.height || window.innerHeight;
                const inputRect = Input.getBoundingClientRect();
                
                // اگر فاصله input تا بالای صفحه بیشتر از نصف ارتفاع ویوپورت باشد، اسکرول بیشتری انجام می‌دهیم
                if (inputRect.top > viewportHeight / 3) {
                    window.scrollBy({
                        top: inputRect.top - (viewportHeight / 5),
                        behavior: 'smooth'
                    });
                }
            }, 300);
        };
        
        Input.addEventListener('focus', handleFocus);
        
        return () => {
            Input.removeEventListener('focus', handleFocus);
        };
    }, []);
    
    // مدیریت تغییرات اندازه ویوپورت (مانند باز شدن کیبورد)
    useEffect(() => {
        // فقط در مرورگرهایی که از visualViewport پشتیبانی می‌کنند اجرا می‌شود
        if (!window.visualViewport) return;
        
        const handleResize = () => {
            const Input = InputRef.current;
            
            if (!Input || document.activeElement !== Input) return;
            
            // اسکرول به موقعیت input
            Input.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        
        window.visualViewport.addEventListener('resize', handleResize);
        
        return () => {
            window.visualViewport.removeEventListener('resize', handleResize);
        };
    }, []);

    // HTML
    return (
        <div
            className={`Search-Modal-Background ${OpenModal ? 'Modal-Active' : 'Modal-DeActive'}`}
            ref={ScrollModalRef}
        >
            <div className="Search-Parent" ref={ClickOut}>
                <div
                    className={`Search-box-Background ${
                        !Empty && Result.length > 0 ? 'Change-Search-Box' : ''
                    }`}
                >
                    <button>
                        <SearchIcon className="Search-Icon" />
                    </button>
                    <input
                        type="search"
                        placeholder="جستجو"
                        onChange={(e) => setValue(e.target.value)}
                        value={Value}
                        ref={InputRef}
                        onFocus={() => {
                            // زمانی که کاربر روی input تمرکز می‌کند، بعد از یک تأخیر کوتاه اسکرول را تنظیم می‌کنیم
                            setTimeout(() => {
                                const viewportHeight = window.innerHeight;
                                const inputRect = InputRef.current.getBoundingClientRect();
                                if (inputRect.top > viewportHeight / 3) {
                                    InputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }, 100);
                        }}
                    />
                </div>
                <div className="Search-Result-Box-Background">
                    <div
                        className={`Search-Result-Box ${
                            !Empty && Result.length > 0 ? 'Show-Result-Box' : ''
                        }`}
                        ref={ResultBoxRef}
                        onTouchStart={() => InputRef.current?.blur()} // حذف فوکوس هنگام لمس
                    >
                        {Value.trim() !== '' &&
                            Result.map((item, index) =>
                                Result.length > 0 ? (
                                    <SearchCard key={index} Title={item.Title} Poster={item.Poster} />
                                ) : null
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;