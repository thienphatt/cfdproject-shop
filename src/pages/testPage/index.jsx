import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SHIPPING_OPTIONS } from "../../constants/general";

const TestContainer = styled.div`
    height: 100vh;
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

    console.log("valueRadio", valueRadio);
    const _onChange = (e) => {
        setvalueRadio(e.target.value);
    };

    return (
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
    );
};

export default TestPage;
