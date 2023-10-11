import React, { forwardRef } from "react";

const Input = (props, ref) => {
  const { label, required, errors, renderInput, ...rest } = props;
  return (
    <div className="form-group">
      <label>
        {label} {required && <span>*</span>}
      </label>

      {/* dòng 12 ý nghĩa : nếu có props renderSelect thì sẽ gọi nó nếu ko thì mặc định(||) chạy input*/}
      {renderInput?.({ errors, ...rest }) || (
        <input
          ref={ref}
          type="text"
          {...rest}
          className={`form-control ${errors ? "input-error" : ""}`}
        />
      )}
      <p style={{ minHeight: 24 }} className="form-error">
        {errors ? errors.message : ""}
      </p>
    </div>
  );
};

export default forwardRef(Input);
