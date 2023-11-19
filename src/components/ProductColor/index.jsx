import React, { forwardRef, useImperativeHandle, useState } from "react";

const ProductColor = ({ colors, defaultColor, onChange }, ref) => {
    const [selectColor, setSelectColor] = useState(defaultColor);
    useImperativeHandle(ref, () => {
        return {
            value: selectColor,
            reset: () => {
                setSelectColor(defaultColor);
            },
        };
    });

    const _onColorChange = (e, color) => {
        e?.stopPropagation();
        e?.preventDefault();
        setSelectColor(color);
        onChange?.(color);
    };

    return (
        <div className="product-nav product-nav-dots">
            {colors?.map((color, i) => (
                <div
                    key={i}
                    onClick={(e) => _onColorChange(e, color)}
                    className={`product-nav-item ${
                        selectColor === color ? "active" : ""
                    }`}
                    style={{ background: `${color}` }}
                >
                    <span className="sr-only">{color}</span>
                </div>
            ))}
        </div>
    );
};

export default forwardRef(ProductColor);
