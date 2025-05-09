import React from "react";
import styles from "./InputComponent.module.scss";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const InputComponent: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => {
  const inputClass = [
    styles.InputComponent__input,
    error ? styles.InputComponent__input__error : "",
  ].join(" ");

  return (
    <div className={styles.InputComponent}>
      <label htmlFor={name} className={styles.InputComponent__label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
      {error && <span className={styles.InputComponent__error}>{error}</span>}
    </div>
  );
};

export default InputComponent;
