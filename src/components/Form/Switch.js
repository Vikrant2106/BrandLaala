import React from "react";
import styles from "./FormElement.module.css";

function Switch({
  label,
  onChange,
  value,
  name,
  onBlur = () => { },
  errorText,
  canToggle = true
}) {
  function handleChange(e) {
    const value = e.target.value;
    if (!value || value === "off") {
      return onChange({
        target: {
          name,
          value: "on",
        },
      });
    }
    if (!canToggle) return;
    onChange({
      target: {
        name,
        value: "on",
      },
    });
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div className={styles.switch}>
        <input
          type="checkbox"
          onChange={handleChange}
          value={value}
          checked={value === "on"}
          onBlur={onBlur}
          name={name}
          id={name}
        />
        <label htmlFor={name}></label>
        <p>{label}</p>
      </div>
      <p className={styles.error}>{errorText}</p>
    </div>
  );
}

export default Switch;
