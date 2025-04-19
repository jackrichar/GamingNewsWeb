import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import searchData from "../../Assets/jsone/topgame/SearchValue.json"; // مسیر فایل JSON

function SearchBox() {
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const customStyles = {
    width: "390px", // عرض 390px
    height: "54px", // ارتفاع 54px
    backgroundColor: "#302F31", // رنگ پس‌زمینه
    color: "white", // رنگ متن
    borderRadius: "30px", // گوشه‌های گرد (اختیاری، قابل تغییر)
    fontSize: "16px", // اندازه فونت (اختیاری)
    fontFamily: "Arial, sans-serif", // فونت (اختیاری)
    placeholderColor: "#cccccc", // رنگ placeholder (اختیاری)
    hoverBackgroundColor: "#3a393b", // رنگ پس‌زمینه آیتم‌ها هنگام هاور
    border: "none", // حذف بوردر (اختیاری)
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // سایه (اختیاری)
  };

  return (
    <div style={{ width: 390, padding: "20px" }}>
      <ReactSearchAutocomplete
        items={searchData} // استفاده از داده‌های JSON
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autoFocus
        placeholder="جستجو..."
        styling={customStyles}
      />
    </div>
  );
}

export default SearchBox;
