import React from "react";
import "./customInput.css";
export const CustomInput = (props) => {
  return (
    <div className="input_wrapper">
      <label>{props.label}</label>
      <input type={props.type} value={props.value} onChange={props.keyup} />
    </div>
  );
};
