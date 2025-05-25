import { useState, useEffect, useRef } from 'react';
import './CustomDualRangeStyle.scss';
import PropTypes from 'prop-types';

function CustomDualRange({ MaxLabel, MinLabel, MinValue, MaxValue, onRangeChange }) {
    // محاسبه totalRange بر اساس MinValue و MaxValue
    const totalRange = MaxValue - MinValue;

    // نرمال کردن مقادیر مین و مکس نسبت به MinValue
    const [min, setMin] = useState(Math.min(MinValue, MaxValue) - MinValue); // مقدار نرمال‌شده مین
    const [max, setMax] = useState(Math.max(MinValue, MaxValue) - MinValue); // مقدار نرمال‌شده مکس

    const trackRef = useRef(null);
    const minThumbRef = useRef(null);
    const maxThumbRef = useRef(null);
    const [isDraggingMin, setIsDraggingMin] = useState(false);
    const [isDraggingMax, setIsDraggingMax] = useState(false);

    // مدیریت کشیدن دکمه‌ها (ماوس و لمس)
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDraggingMin && trackRef.current) {
                const rect = trackRef.current.getBoundingClientRect();
                let newMin = ((e.clientX - rect.left) / rect.width) * totalRange;
                newMin = Math.max(0, Math.min(newMin, max));
                setMin(Math.round(newMin));
            }
            if (isDraggingMax && trackRef.current) {
                const rect = trackRef.current.getBoundingClientRect();
                let newMax = ((e.clientX - rect.left) / rect.width) * totalRange;
                newMax = Math.min(totalRange, Math.max(newMax, min));
                setMax(Math.round(newMax));
            }
        };

        const handleTouchMove = (e) => {
            e.preventDefault(); // جلوگیری از اسکرول صفحه موقع لمس
            if (isDraggingMin && trackRef.current) {
                const rect = trackRef.current.getBoundingClientRect();
                let newMin = ((e.touches[0].clientX - rect.left) / rect.width) * totalRange;
                newMin = Math.max(0, Math.min(newMin, max));
                setMin(Math.round(newMin));
            }
            if (isDraggingMax && trackRef.current) {
                const rect = trackRef.current.getBoundingClientRect();
                let newMax = ((e.touches[0].clientX - rect.left) / rect.width) * totalRange;
                newMax = Math.min(totalRange, Math.max(newMax, min));
                setMax(Math.round(newMax));
            }
        };

        const handleMouseUp = () => {
            setIsDraggingMin(false);
            setIsDraggingMax(false);
        };

        const handleTouchEnd = () => {
            setIsDraggingMin(false);
            setIsDraggingMax(false);
        };

        if (isDraggingMin || isDraggingMax) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDraggingMin, isDraggingMax, min, max, totalRange]);

    // تغییر مین با ورودی
    const handleMinInputChange = (e) => {
        const newMin = parseInt(e.target.value, 10) || MinValue;
        const normalizedMin = newMin - MinValue;
        if (normalizedMin <= max && normalizedMin >= 0 && normalizedMin <= totalRange) {
            setMin(normalizedMin);
        }
    };

    // تغییر مکس با ورودی
    const handleMaxInputChange = (e) => {
        const newMax = parseInt(e.target.value, 10) || MaxValue;
        const normalizedMax = newMax - MinValue;
        if (normalizedMax >= min && normalizedMax <= totalRange && normalizedMax >= 0) {
            setMax(normalizedMax);
        }
    };

    // شروع کشیدن دکمه‌ها (ماوس و لمس)
    const startDraggingMin = (e) => {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض
        setIsDraggingMin(true);
    };

    const startDraggingMax = (e) => {
        e.preventDefault(); // جلوگیری از رفتار پیش‌فرض
        setIsDraggingMax(true);
    };

    // نمایش مقادیر واقعی (نه نرمال‌شده) توی ورودی‌ها
    const displayMin = min + MinValue;
    const displayMax = max + MinValue;

    // فراخوانی onRangeChange هر بار که min یا max تغییر می‌کنه
    useEffect(() => {
        if (onRangeChange) {
            onRangeChange({
                minValue: displayMin,
                maxValue: displayMax,
            });
        }
    }, [min, max, displayMin, displayMax, onRangeChange]);

    return (
        <div className="custom-range-wrapper">
            <div className="custom-range-inputs">
                <div className="custom-range-input-container">
                    <label className="custom-range-label">{MinLabel}</label>
                    <input
                        type="number"
                        value={displayMin}
                        onChange={handleMinInputChange}
                        min={MinValue}
                        max={displayMax}
                        className="custom-range-input"
                    />
                </div>
                <div className="custom-range-input-container">
                    <label className="custom-range-label">{MaxLabel}</label>
                    <input
                        type="number"
                        value={displayMax}
                        onChange={handleMaxInputChange}
                        min={displayMin}
                        max={MaxValue}
                        className="custom-range-input"
                    />
                </div>
            </div>

            <div className="custom-range-container">
                {/* خط اصلی اسلایدر */}
                <div
                    ref={trackRef}
                    className="custom-range-track"
                    onMouseDown={(e) => {
                        const rect = trackRef.current.getBoundingClientRect();
                        const clickPos = ((e.clientX - rect.left) / rect.width) * totalRange;
                        if (clickPos < (min + max) / 2) {
                            setMin(Math.round(clickPos));
                        } else {
                            setMax(Math.round(clickPos));
                        }
                    }}
                    onTouchStart={(e) => {
                        const rect = trackRef.current.getBoundingClientRect();
                        const touchPos = ((e.touches[0].clientX - rect.left) / rect.width) * totalRange;
                        if (touchPos < (min + max) / 2) {
                            setMin(Math.round(touchPos));
                        } else {
                            setMax(Math.round(touchPos));
                        }
                    }}
                >
                    {/* بخش پرشده بین مین و مکس */}
                    <div
                        className="custom-range-filled"
                        style={{
                            left: `${(min / totalRange) * 100}%`,
                            width: `${((max - min) / totalRange) * 100}%`,
                        }}
                    />
                </div>

                {/* دکمه مین */}
                <div
                    ref={minThumbRef}
                    className="custom-range-thumb custom-range-thumb-min"
                    style={{ left: `${(min / totalRange) * 100}%` }}
                    onMouseDown={startDraggingMin}
                    onTouchStart={startDraggingMin}
                />

                {/* دکمه مکس */}
                <div
                    ref={maxThumbRef}
                    className="custom-range-thumb custom-range-thumb-max"
                    style={{ left: `${(max / totalRange) * 100}%` }}
                    onMouseDown={startDraggingMax}
                    onTouchStart={startDraggingMax}
                />
            </div>
        </div>
    );
}

CustomDualRange.propTypes = {
    MaxLabel: PropTypes.string.isRequired,
    MinLabel: PropTypes.string.isRequired,
    MinValue: PropTypes.number.isRequired,
    MaxValue: PropTypes.number.isRequired,
    onRangeChange: PropTypes.func, // پراپس جدید برای خروجی
};

CustomDualRange.defaultProps = {
    onRangeChange: () => {}, // مقدار پیش‌فرض برای جلوگیری از خطا
};

export default CustomDualRange;