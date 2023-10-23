import React from "react";

const CheckBox = ({ label, onChange, id, className, checked, ...props }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id || "checkbox"}
        onChange={onChange}
        {...props}
      />
      <label className="custom-control-label" htmlFor={id || "checkbox"}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
