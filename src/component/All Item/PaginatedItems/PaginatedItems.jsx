import React, { useState, useEffect } from 'react';
import './PaginatedItemsStyle.scss';
import propTypes from 'prop-types';
import Cart from '../Cart/Cart';

// Import SVG for arrows
import { ReactComponent as ArrowIco } from '../../../Assets/Icon/Arrow.svg';

const PaginatedItems = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6); // مقدار پیش‌فرض

    // مدیریت ذخیره‌سازی آیتم‌ها
    const [savedItems, setSavedItems] = useState(new Set());

    const handleSave = (id) => {
        setSavedItems((prev) => {
            const newSavedItems = new Set(prev);
            if (newSavedItems.has(id)) {
                newSavedItems.delete(id);
            } else {
                newSavedItems.add(id);
            }
            return newSavedItems;
        });
    };

    // تنظیم دینامیک itemsPerPage بر اساس عرض صفحه
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 576) {
                setItemsPerPage(3); // ۳ آیتم توی موبایل
            } else {
                setItemsPerPage(6); // ۶ آیتم توی دسکتاپ و تبلت
            }
            // به‌روزرسانی صفحه فعلی اگه تعداد صفحات تغییر کرد
            const totalPagesNew = Math.ceil(items.length / itemsPerPage);
            if (currentPage > totalPagesNew) setCurrentPage(totalPagesNew || 1);
        };

        handleResize(); // اجرای اولیه
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [items.length]);

    // محاسبه شاخص‌ها
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // تعداد کل صفحات
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // تغییر صفحه
    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            const grid = document.querySelector('.items-grid');
            if (grid) grid.classList.add('items-grid-animated');
        }
    };

    const goToPrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // انیمیشن اولیه برای گرید
    useEffect(() => {
        const timer = setTimeout(() => {
            const grid = document.querySelector('.items-grid');
            if (grid) grid.style.opacity = '1';
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // محاسبه شماره صفحات قابل‌نمایش (حداکثر ۵ شماره + سه‌نقطه)
    const getVisiblePages = () => {
        const visiblePagesCount = 5;
        const halfVisible = Math.floor(visiblePagesCount / 2);
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + visiblePagesCount - 1);

        if (endPage - startPage + 1 < visiblePagesCount) {
            startPage = Math.max(1, endPage - visiblePagesCount + 1);
        }

        const pages = [];
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="paginated-items-container">
            <div className="items-grid">
                {currentItems.map((item) => (
                    <div key={item.id} className="Background-Cart-Archive">
                        <Cart
                            id={item.id}
                            name={item.Title}
                            genre={item.Genre}
                            poster={item.Banner}
                            savegame={item.SaveGame || savedItems.has(item.id)}
                            onSave={handleSave}
                        />
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className="pagination-btn pagination-btn-arrow"
                >
                    <ArrowIco className="arrow-left" />
                </button>
                <div className="pagination-numbers">
                    {getVisiblePages().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="pagination-ellipsis">...</span>
                            ) : (
                                <button
                                    onClick={() => paginate(page)}
                                    className={`pagination-btn pagination-btn-number ${
                                        currentPage === page ? 'active' : ''
                                    }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className="pagination-btn pagination-btn-arrow"
                >
                    <ArrowIco className="arrow-right" />
                </button>
            </div>
        </div>
    );
};

PaginatedItems.propTypes = {
    items: propTypes.array.isRequired,
};

export default PaginatedItems;