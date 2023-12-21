import { Modal } from "antd";
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import useTestPage from "./useTestPage";

const TestContainer = styled.div`
    height: 500px;
    margin: 0 auto;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TestPage = () => {
    const { handleSearch } = useTestPage();

    let timeoutId;

    const _onSearch = (value) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            handleSearch(value);
        }, 1000);
    };

    return (
        <TestContainer>
            <input type="text" onChange={(e) => _onSearch(e.target.value)} />
        </TestContainer>
    );
};

export default TestPage;
