import React, { useState } from "react";

const PriceFilter = () => {
    const [price, setPrice] = useState(500);

    return (
        <div>
            <label for="price-slider">Chọn giá tiền:</label>
            <input
                type="range"
                id="price-slider"
                min="0"
                max="1000"
                step="10"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <p id="price-label">
                Giá tiền: $<span id="price-value">{price}</span>
            </p>
        </div>
    );
};

export default PriceFilter;
