const Select = ({
    options = [],
    value = "",
    error = "",
    onChange = () => {},
    ...rest
}) => {
    return (
        <select
            className={`select form__input ${!!error ? "formerror" : ""}`}
            value={value || ""}
            onChange={onChange}
            {...rest}
        >
            {options.map((option, index) => (
                <option key={option.value || index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
