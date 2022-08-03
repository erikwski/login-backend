import React from "react";
import "./customInput.css";
export const CustomSelect = (props) => {
  return (
    <div className="input_wrapper">
      <label>{props.label}</label>
      <select value={props.value} onChange={props.change}>
        {props.data.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.title}
          </option>
        ))}
      </select>
    </div>
  );
};
