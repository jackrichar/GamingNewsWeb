import React, { useState, useEffect, useMemo, useRef } from 'react';
import './PaginatedItemsStyle.scss';
import PropTypes from 'prop-types';
import Cart from '../Cart/Cart';
import { ReactComponent as ArrowIco } from '../../../Assets/Icon/Arrow.svg';

const PaginatedItems = ({ items, Year, Genres, MetaPoint }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [savedItems, setSavedItems] = useState(new Set());
    const gridRef = useRef(null);

    // Debounce function for resize event
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    // فیلتر کردن آیتم‌ها با useMemo برای جلوگیری از محاسبات غیرضروری
    const filteredItems = useMemo(() => {
        let result = [...items];

        if (Year?.minValue !== undefined && Year?.maxValue !== undefined) {
            result = result.filter((item) => {
                const itemYear = item.Year || 0;
                return itemYear >= Year.minValue && itemYear <= Year.maxValue;
            });
        }

        if (Genres?.length > 0) {
            result = result.filter((item) => {
                const itemGenre = item.Genre || '';
                return Genres.includes(itemGenre);
            });
        }

        if (MetaPoint?.minValue !== undefined && MetaPoint?.maxValue !== undefined) {
            result = result.filter((item) => {
                const itemScore = item.MetaScore || 0;
                return itemScore >= MetaPoint.minValue && itemScore <= MetaPoint.maxValue;
            });
        }

        return result;
    }, [items, Year, Genres, MetaPoint]);

    // تنظیم دینامیک itemsPerPage با Debouncing
    useEffect(() => {
        const handleResize = debounce(() => {
            const newItemsPerPage = window.innerWidth <= 576 ? 3 : 6;
            setItemsPerPage((prev) => {
                if (prev !== newItemsPerPage) {
                    const totalPagesNew = Math.ceil(filteredItems.length / newItemsPerPage);
                    setCurrentPage((prevPage) => Math.min(prevPage, totalPagesNew || 1));
                    return newItemsPerPage;
                }
                return prev;
            });
        }, 200);

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [filteredItems.length]);

    // ریست کردن صفحه به 1 بعد از فیلتر
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredItems]);

    // انیمیشن اولیه برای گرید
    useEffect(() => {
        const timer = setTimeout(() => {
            if (gridRef.current) {
                gridRef.current.style.opacity = '1';
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

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

    // محاسبه شاخص‌ها
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            if (gridRef.current) {
                gridRef.current.classList.add('items-grid-animated');
            }
        }
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // محاسبه شماره صفحات قابل‌نمایش
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
            <div className="items-grid" ref={gridRef}>
                {currentItems.length > 0 ? (
                    currentItems.map((item) => (
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
                    ))
                ) : (
                    <div className="no-items-message">هیچ آیتمی با این فیلتر یافت نشد.</div>
                )}
            </div>
            {currentItems.length > 0 && (
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
            )}
        </div>
    );
};

PaginatedItems.propTypes = {
    items: PropTypes.array.isRequired,
    Genres: PropTypes.array.isRequired,
    MetaPoint: PropTypes.object.isRequired,
    Year: PropTypes.object.isRequired,
};

export default PaginatedItems;