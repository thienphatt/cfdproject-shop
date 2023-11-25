import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SHIPPING_OPTIONS } from "../../constants/general";
import ProductCard from "../../components/ProductCard";

const TestContainer = styled.div`
    height: 500px;
    margin: 0 auto;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormRadio = styled.form`
    label {
        margin: 20px;
    }
`;

const TestPage = () => {
    const [valueRadio, setvalueRadio] = useState();

    const { cartInfo } = useSelector((state) => state.cart);
    const _onChange = (e) => {
        setvalueRadio(e.target.value);
    };

    return (
        <>
            <TestContainer>
                <FormRadio>
                    {SHIPPING_OPTIONS.map((option, i) => {
                        const { value, label, price } = option;
                        return (
                            <div key={i} className="form-group">
                                <input
                                    type="radio"
                                    checked={value === valueRadio}
                                    value={value}
                                    id={value}
                                    onChange={(e) => _onChange(e)}
                                />
                                <label htmlFor={value}>{label}</label>
                                <span>${price}</span>
                            </div>
                        );
                    })}
                </FormRadio>
            </TestContainer>

            <span
                style={{
                    backgroundColor: "black",
                    width: "100%",
                    height: "1px",
                    display: "block",
                }}
            ></span>
            <div style={{ display: "flex", gap: "20px", marginTop: "100px" }}>
                {cartInfo?.product?.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </div>
        </>
    );
};

export default TestPage;
