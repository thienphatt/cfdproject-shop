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
    const products = useTestPage();

    const [isShowModal, setIsShowModal] = useState(false);

    const [modal, contextHolder] = Modal.useModal();

    console.log("modal", modal);

    const _onReview = useCallback((e, i) => {
        setIsShowModal(true);
        // Modal.info();

        // Modal.caller();
    });

    const _onCancel = useCallback(() => {
        setIsShowModal(false);
    });

    const _onOk = useCallback(() => {
        setIsShowModal(false);
    });

    return (
        <TestContainer>
            {products?.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 20 }}>
                    <p>{item}</p>
                    <button onClick={(e) => _onReview(e, i)}>
                        Review + {item}
                    </button>
                </li>
            ))}
            <Modal open={isShowModal} onCancel={_onCancel} onOk={_onOk}></Modal>
        </TestContainer>
    );
};

export default TestPage;
