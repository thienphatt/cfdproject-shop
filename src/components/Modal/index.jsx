import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPE } from "../../constants/general";
import {
    handleCloseModal,
    handleShowModal,
} from "../../store/reducers/authReducer";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Modal = () => {
    const { isShowModal } = useSelector((state) => state.auth);

    const dispath = useDispatch();

    const _onCloseModal = (e) => {
        e?.preventDefault();
        dispath(handleCloseModal());
    };

    return (
        <>
            <div
                style={{
                    opacity: isShowModal ? 1 : 0,
                    visibility: isShowModal ? "visible" : "hidden",
                    display: "block",
                    transition: 0.3,
                    zIndex: 1000,
                }}
                className="modal fade"
                id="signin-modal"
                tabIndex={-1}
                role="dialog"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    style={{ transform: "none" }}
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => _onCloseModal()}
                            >
                                <span aria-hidden="true">
                                    <i className="icon-close" />
                                </span>
                            </button>
                            <div className="form-box">
                                <div className="form-tab">
                                    <ul
                                        className="nav nav-pills nav-fill nav-border-anim"
                                        role="tablist"
                                    >
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${
                                                    isShowModal === "login"
                                                        ? "active"
                                                        : ""
                                                } `}
                                                onClick={() => {
                                                    dispath(
                                                        handleShowModal(
                                                            MODAL_TYPE.login
                                                        )
                                                    );
                                                }}
                                            >
                                                Sign In
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${
                                                    isShowModal === "register"
                                                        ? "active"
                                                        : ""
                                                } `}
                                                onClick={() => {
                                                    dispath(
                                                        handleShowModal(
                                                            MODAL_TYPE.register
                                                        )
                                                    );
                                                }}
                                            >
                                                Register
                                            </a>
                                        </li>
                                    </ul>
                                    <div
                                        className="tab-content"
                                        id="tab-content-5"
                                    >
                                        {isShowModal === "login" && (
                                            <LoginForm />
                                        )}
                                        {/* .End .tab-pane */}
                                        {isShowModal === "register" && (
                                            <RegisterForm />
                                        )}
                                        {/* .End .tab-pane */}
                                    </div>
                                    {/* End .tab-content */}
                                </div>
                                {/* End .form-tab */}
                            </div>
                            {/* End .\form-box */}
                        </div>
                        {/* End .modal-body */}
                    </div>
                    {/* End .modal-content */}
                </div>
                {/* End .modal-dialog */}
                <div
                    onClick={() =>
                        // e.stopPropagation();
                        _onCloseModal()
                    }
                    className="modal-backdrop fade show"
                    style={{
                        opacity: isShowModal ? 0.9 : 0,
                        visibility: isShowModal ? "visible" : "hidden",
                        display: "block",
                        zIndex: -1,
                    }}
                ></div>
            </div>
        </>
    );
};

export default Modal;
