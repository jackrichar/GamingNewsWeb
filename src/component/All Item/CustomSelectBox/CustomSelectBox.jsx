import React, { useEffect, useRef, useState } from "react";
import "./CustomSelectBoxStyle.scss";
import PropTypes from "prop-types";

import { ReactComponent as RightArrowIcon } from "../../../Assets/Icon/RightArrow.svg";

const CustomSelectBox = ({
  Placeholder,
  Value,
  onChange = (value) => {},
  InitialSelected = [],
  Multiple = false,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [MultipleValue, setMultipleValue] = useState(InitialSelected);

  const ClickOut = useRef(null);

  const handleSelect = (event) => {
    const target = event.target.closest("button[data-name]");

    if (target) {
      const name = target.dataset.name;
      setSelectedItem(name);
    }
  };

  const handleCheckboxChange = (item) => {
    const updatedSelection = MultipleValue.includes(item)
      ? MultipleValue.filter((selected) => selected !== item)
      : [...MultipleValue, item];
    setMultipleValue(updatedSelection);
    onChange(updatedSelection);
  };
  console.log(MultipleValue);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ClickOut.current && !ClickOut.current.contains(event.target)) {
        setIsShow(false);
        console.log(ClickOut.current.contains(event.target));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // پشتیبانی از لمس
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [setIsShow]);

  useEffect(() => {
    onChange(selectedItem);
  }, [onChange, selectedItem]);

  return (
    <div
      className="Custom-Select-Box"
      onClick={() => setIsShow(!isShow)}
      ref={ClickOut}
    >
      <div className={`Custom-Select-Box-Text`}>
        <span>{!selectedItem ? Placeholder : selectedItem}</span>
      </div>
      <div className="Custom-Select-Box-Arrow">
        <RightArrowIcon
          style={isShow ? { rotate: "90deg" } : { rotate: "0deg" }}
        />
      </div>
      <div
        className={`Custom-Select-Box-Drop-Down ${isShow ? "Show-Up" : null}`}
      >
        <ul className="Item-List-Background" onClick={(e) => handleSelect(e)}>
          {Value.map((item, index) => (
            <li className="Item-List" key={index}>
              {!Multiple ? (
                <button
                  data-name={item}
                  className={`Item-List-Button ${
                    selectedItem === item ? "Item-List-Button-Active" : null
                  }`}
                >
                  <span>{item}</span>
                </button>
              ) : (
                <div className="Item-List-Checkbox">
                  <label htmlFor={item}>{item}</label>
                  <input
                    type={"checkbox"}
                    id={item}
                    onChange={(e) => handleCheckboxChange(e.target.id)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CustomSelectBox.propTypes = {
  Placeholder: PropTypes.string.isRequired,
  Value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  Multiple: PropTypes.bool,
  initialSelected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

export default CustomSelectBox;
