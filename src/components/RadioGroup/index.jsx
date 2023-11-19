import React, { createContext, useContext, useEffect, useState } from "react";

const RadioContext = createContext();

const RadioGroup = ({
    defaultValue,
    children,
    className,
    disabled,
    onChange,
}) => {
    // Creat State for storage Value select from Radio
    const [value, setValue] = useState(defaultValue || "");

    //even defaultValue change -> update Componment again
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const onCheckChange = (e) => {
        const value = e?.target.value;
        // e?.preventDefault();
        // e?.stopPropagation();
        setValue(value);
        onChange?.(value);
    };
    return (
        <RadioContext.Provider
            value={{ value, disabled, onCheckChange }}
            className={`radio-group ${className}`}
        >
            {children}
        </RadioContext.Provider>
    );
};

const RadioItem = ({ children, disabled = false, value }) => {
    const { value: selectedValue, onCheckChange } = useContext(RadioContext);

    return (
        <div className="custom-control custom-radio">
            <input
                type="radio"
                id={value}
                name={value}
                value={value}
                checked={selectedValue === value}
                disabled={disabled}
                onChange={onCheckChange}
                className="custom-control-input"
            />
            <label className="custom-control-label" htmlFor={value}>
                {children}
            </label>
        </div>
    );
};

RadioGroup.Item = RadioItem;

export default RadioGroup;
