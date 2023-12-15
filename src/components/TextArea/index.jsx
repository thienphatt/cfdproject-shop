import React, { forwardRef } from "react";

const TextArea = ({ error, ...rest }, ref) => {
    return (
        <textarea
            ref={ref}
            className={`form__input ${error ? "formerror" : ""}`}
            {...rest}
        />
    );
};

export default forwardRef(TextArea);
