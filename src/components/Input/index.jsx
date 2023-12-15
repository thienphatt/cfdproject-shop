import React, { forwardRef } from "react";

const Input = (props, ref) => {
    const {
        className,
        label,
        required,
        errors,
        renderInput,
        name = "",
        ...rest
    } = props;

    return (
        <div className="form-group">
            <label htmlFor={name}>
                {label} {required && <span>*</span>}
            </label>

            {/* dòng 12 ý nghĩa : nếu có props renderSelect thì sẽ gọi nó nếu ko thì mặc định(||) chạy input*/}
            {renderInput?.({ errors, ...rest }) || (
                <input
                    ref={ref}
                    type="text"
                    name={name}
                    {...rest}
                    className={`form-control ${errors ? "input-error" : ""}`}
                />
            )}
            <p style={{ minHeight: 14 }} className="form-error">
                {errors ? errors.message : ""}
            </p>
        </div>
    );
};

export default forwardRef(Input);
