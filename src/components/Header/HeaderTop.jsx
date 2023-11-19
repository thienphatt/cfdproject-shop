import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MODAL_TYPE } from "../../constants/general";
import { ANTMESSAGE } from "../../constants/messageConfig";
import { PATHS } from "../../constants/paths";
import {
    handleGetProfile,
    handleLogout,
    handleShowModal,
} from "../../store/reducers/authReducer";
import { clearCar } from "../../store/reducers/cartReducer";
import tokenMethod from "../../utils/token";

const HeaderTop = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!!tokenMethod.get()) {
            dispatch(handleGetProfile());
        }
    }, []);

    const { profile } = useSelector((state) => state.auth);
    const { firstName, whiteList, email } = profile || {};

    // Click Showmodal
    const _onShowAuthModal = (e, modalType) => {
        e?.preventDefault();
        e?.stopPropagation();
        console.log("modalType", modalType);
        // handleShowModal?.(MODAL_TYPES.login);
        dispatch(handleShowModal(modalType));
    };

    //click close modal
    const _onSignOut = (e) => {
        e?.preventDefault();
        // handleLogout();
        dispatch(handleLogout());
        dispatch(clearCar());
        message.success(ANTMESSAGE.logOutMessage);
        navigate(PATHS.HOME);
    };

    return (
        <div className="header-top">
            <div className="container">
                <div className="header-left">
                    <a href="tel:0989596912">
                        <i className="icon-phone" /> Hotline: 098 9596 912
                    </a>
                </div>
                <div className="header-right">
                    {/* Not LogIn */}
                    {!!!tokenMethod.get() ? (
                        <ul className="top-menu top-link-menu">
                            <li>
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                    href="#signin-modal"
                                    className="top-menu-login"
                                >
                                    <i className="icon-user"></i>
                                    <span
                                        onClick={(e) => {
                                            _onShowAuthModal(
                                                e,
                                                MODAL_TYPE.login
                                            );
                                        }}
                                    >
                                        Login
                                    </span>
                                </a>
                                <span>/</span>
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                    href="#signin-modal"
                                    className="top-menu-login"
                                >
                                    {/* <i className="icon-user"></i>{" "} */}
                                    <span
                                        onClick={(e) => {
                                            _onShowAuthModal(
                                                e,
                                                MODAL_TYPE.register
                                            );
                                        }}
                                    >
                                        Resgister
                                    </span>
                                </a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="top-menu">
                            <li>
                                <Link
                                    to={PATHS.DASHBOARD}
                                    className="top-link-menu"
                                >
                                    <i className="icon-user" />
                                    {firstName || email}
                                </Link>
                                <ul>
                                    <li>
                                        <ul>
                                            <li>
                                                <Link to={PATHS.DASHBOARD}>
                                                    Account Details
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={PATHS.PROFILE.ORDER}>
                                                    Your Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={PATHS.PROFILE.WISHLIST}
                                                >
                                                    Wishlist{" "}
                                                    <span>
                                                        ({whiteList?.length})
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={(e) => {
                                                        _onSignOut(e);
                                                    }}
                                                    href="#"
                                                >
                                                    Sign Out
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )}

                    {/* Logged In */}
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;
