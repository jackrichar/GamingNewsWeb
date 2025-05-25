import React, { useState, useEffect } from 'react';
import './FilterStyle.scss';

// Import SVG
import { ReactComponent as FilterIco } from '../../../Assets/Icon/Filter.svg';
import { ReactComponent as CloseIco } from '../../../Assets/Icon/Clear.svg';
import { ReactComponent as CalendarIco } from '../../../Assets/Icon/Calander.svg';
import { ReactComponent as GenreIco } from '../../../Assets/Icon/GamingControll.svg';
import { ReactComponent as MetacriticIco } from '../../../Assets/Icon/Metacritic.svg';

// Import Component
import CustomDualRange from '../../All Item/CustomDualRange/CustomDualRange';

const Filter = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false); // استیت یکپارچه برای فیلتر
    const [activeSection, setActiveSection] = useState(null); // استیت برای بخش فعال
    const [titleVisibility, setTitleVisibility] = useState({
        calendar: false,
        genre: false,
        meta: false,
    }); // استیت برای نمایش تایتل‌ها

    // مدیریت نمایش تایتل‌ها با تأخیر بعد از غیرفعال شدن
    useEffect(() => {
        const timers = {};

        if (!activeSection) {
            // وقتی هیچ بخشی فعال نیست، تایتل‌ها رو با تأخیر نمایش بده
            const showTitles = () => {
                setTitleVisibility({
                    calendar: true,
                    genre: true,
                    meta: true,
                });
            };

            const timer = setTimeout(showTitles, 150);
            timers.general = timer;
        } else {
            // وقتی یه بخش فعال می‌شه، تایتل اون بخش رو مخفی کن
            const hideTitle = () => {
                setTitleVisibility((prev) => ({
                    ...prev,
                    [activeSection]: false,
                }));
            };

            const timer = setTimeout(hideTitle, 0); // فوراً مخفی کن
            timers[activeSection] = timer;
        }

        // تمیزکاری
        return () => {
            Object.values(timers).forEach((timer) => clearTimeout(timer));
        };
    }, [activeSection]);

    // تابع برای تغییر بخش فعال
    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
        setIsFilterOpen(true); // باز نگه داشتن فیلتر وقتی بخش فعال می‌شه
    };

    return (
        <div className="Archive-Page-Filter-Background">
            <div className="Archive-Page-Filter">
                <button
                    className="Archive-Page-Filter-Logo"
                    onClick={() => {
                        setIsFilterOpen(!isFilterOpen);
                        setActiveSection(null); // بستن همه بخش‌ها
                    }}
                >
                    {isFilterOpen ? <CloseIco /> : <FilterIco />}
                </button>
                <div className={`Archive-Page-Filter-Item ${isFilterOpen ? 'Show-On-Year-Section' : ''}`}>
                    <button
                        className="Archive-Page-Filter-Logo"
                        onClick={() => toggleSection('calendar')}
                    >
                        {activeSection === 'calendar' ? <CloseIco /> : <CalendarIco />}
                    </button>
                    <div className={`Filter-Content ${activeSection === 'calendar' ? 'Show-On-Year-Filter-Content' : ''}`}>
                        <CustomDualRange MinLabel="از سال" MaxLabel="تا سال" MaxValue={2025} MinValue={1991} />
                    </div>
                    {!activeSection && titleVisibility.calendar && <div className="Title-Section"><span>تاریخ</span></div>}
                </div>
                <div className={`Archive-Page-Filter-Item ${isFilterOpen ? 'Show-On-Genre-Section' : ''}`}>
                    <button
                        className="Archive-Page-Filter-Logo"
                        onClick={() => toggleSection('genre')}
                    >
                        {activeSection === 'genre' ? <CloseIco /> : <GenreIco />}
                    </button>
                    <div className="Filter-Content">
                        {/* بخش ژانر هنوز خالیه، می‌تونی اینجا محتوا اضافه کنی */}
                    </div>
                    {!activeSection && titleVisibility.genre && <div className="Title-Section"><span>ژانر</span></div>}
                </div>
                <div className={`Archive-Page-Filter-Item ${isFilterOpen ? 'Show-On-Meta-Section' : ''}`}>
                    <button
                        className="Archive-Page-Filter-Logo"
                        onClick={() => toggleSection('meta')}
                    >
                        {activeSection === 'meta' ? <CloseIco /> : <MetacriticIco />}
                    </button>
                    <div className={`Filter-Content ${activeSection === 'meta' ? 'Show-On-Year-Filter-Content' : ''}`}>
                        <CustomDualRange MaxValue={100} MinValue={0} />
                    </div>
                    {!activeSection && titleVisibility.meta && <div className="Title-Section"><span>امتیاز</span></div>}
                </div>
            </div>
        </div>
    );
};

export default Filter;