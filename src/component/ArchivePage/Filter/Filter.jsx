import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './FilterStyle.scss';

// Import SVG
import { ReactComponent as FilterIco } from '../../../Assets/Icon/Filter.svg';
import { ReactComponent as CloseIco } from '../../../Assets/Icon/Clear.svg';
import { ReactComponent as CalendarIco } from '../../../Assets/Icon/Calander.svg';
import { ReactComponent as GenreIco } from '../../../Assets/Icon/GamingControll.svg';
import { ReactComponent as MetacriticIco } from '../../../Assets/Icon/Metacritic.svg';

// Import Component
import CustomDualRange from '../../All Item/CustomDualRange/CustomDualRange';
import CustomSelectBox from '../../All Item/CustomSelectBox/CustomSelectBox';

const Filter = ({ setYear, setGenres, setMetaPoint }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

    // Debounce function for state updates
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    // مدیریت نمایش تایتل‌ها با استفاده از useMemo
    const titleVisibility = useMemo(() => {
        if (!activeSection) {
            return { calendar: true, genre: true, meta: true };
        }
        return {
            calendar: activeSection !== 'calendar',
            genre: activeSection !== 'genre',
            meta: activeSection !== 'meta',
        };
    }, [activeSection]);

    // تابع toggleSection با useCallback برای جلوگیری از رندر اضافی
    const toggleSection = useCallback(
        (section) => {
            setActiveSection((prev) => (prev === section ? null : section));
            setIsFilterOpen(true);
        },
        [setActiveSection, setIsFilterOpen]
    );

    // تابع‌های به‌روزرسانی استیت با Debounce
    const handleChangeYear = useCallback(
        debounce((value) => {
            setYear(value);
        }, 300),
        [setYear]
    );

    const handleChangeMetaPoint = useCallback(
        debounce((value) => {
            setMetaPoint(value);
        }, 300),
        [setMetaPoint]
    );

    const handleChangeGenre = useCallback(
        debounce((value) => {
            setGenres(value);
        }, 300),
        [setGenres]
    );

    // مدیریت تایمرها با useEffect بهینه‌شده
    useEffect(() => {
        let timer;
        if (!activeSection) {
            timer = setTimeout(() => {
                // هیچ عملیاتی نیاز نیست، چون titleVisibility قبلاً با useMemo محاسبه شده
            }, 150);
        }
        return () => clearTimeout(timer);
    }, [activeSection]);

    return (
        <div
            className="Archive-Page-Filter-Background"
            onClick={(e) => e.stopPropagation()} // جلوگیری از انتشار رویداد به بالا
        >
            <div className="Archive-Page-Filter">
                <button
                    className="Archive-Page-Filter-Logo"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFilterOpen(!isFilterOpen);
                        setActiveSection(null);
                    }}
                >
                    {isFilterOpen ? <CloseIco /> : <FilterIco />}
                </button>
                <div className={`Archive-Page-Filter-Item ${isFilterOpen ? 'Show-On-Year-Section' : ''}`}>
                    <button
                        className="Archive-Page-Filter-Logo"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('calendar');
                        }}
                    >
                        {activeSection === 'calendar' ? <CloseIco /> : <CalendarIco />}
                    </button>
                    <div
                        className={`Filter-Content ${activeSection === 'calendar' ? 'Show-On-Year-Filter-Content' : ''}`}
                    >
                        <CustomDualRange
                            MinLabel="از سال"
                            MaxLabel="تا سال"
                            MaxValue={2025}
                            MinValue={1991}
                            onRangeChange={handleChangeYear}
                        />
                    </div>
                    {!activeSection && titleVisibility.calendar && (
                        <div className="Title-Section">
                            <span>تاریخ</span>
                        </div>
                    )}
                </div>
                <div className={`Archive-Page-Filter-Item ${isFilterOpen ? 'Show-On-Genre-Section' : ''}`}>
                    <button
                        className="Archive-Page-Filter-Logo"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('genre');
                        }}
                    >
                        {activeSection === 'genre' ? <CloseIco /> : <GenreIco />}
                    </button>
                    <div
                        className={`Filter-Content ${activeSection === 'genre' ? 'Show-On-Year-Filter-Content' : ''}`}
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <CustomSelectBox
                            Placeholder="ژانر"
                            Value={['Action', 'RPG', 'FPP']}
                            Multiple={true}
                            onChange={handleChangeGenre}
                        />
                    </div>
                    {!activeSection && titleVisibility.genre && (
                        <div className="Title-Section">
                            <span>ژانر</span>
                        </div>
                    )}
                </div>
                <div className={`Archive-Page-Filter-Item ${isFilterOpen ? 'Show-On-Meta-Section' : ''}`}>
                    <button
                        className="Archive-Page-Filter-Logo"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('meta');
                        }}
                    >
                        {activeSection === 'meta' ? <CloseIco /> : <MetacriticIco />}
                    </button>
                    <div
                        className={`Filter-Content ${activeSection === 'meta' ? 'Show-On-Year-Filter-Content' : ''}`}
                    >
                        <CustomDualRange
                            MaxValue={100}
                            MinValue={0}
                            onRangeChange={handleChangeMetaPoint}
                        />
                    </div>
                    {!activeSection && titleVisibility.meta && (
                        <div className="Title-Section">
                            <span>امتیاز</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filter;