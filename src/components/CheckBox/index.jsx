import React from "react";

const CheckBox = ({ label, onChange, id, className, ...props }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id || "checkbox"}
        onChange={(e) => onChange(e)}
        {...props}
      />
      <label className="custom-control-label" htmlFor={id || "checkbox"}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
