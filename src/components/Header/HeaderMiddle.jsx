import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import useHeaderMiddle from "../../hook/useHeaderMiddle";
import HeaderCardDropDown from "../CartDropDown";
import { MenuStyle } from "../styled-components";
import HeaderSearch from "./HeaderSearch";
import { handleShowNavbar } from "../../store/reducers/mainReducer";

const HeaderMiddle = () => {
    const dispath = useDispatch();
    const { headerMiddleProps } = useHeaderMiddle();

    return (
        <div className="header-middle sticky-header">
            <div className="container">
                <div className="header-left">
                    <button
                        onClick={() => dispath(handleShowNavbar())}
                        className="mobile-menu-toggler"
                    >
                        <span className="sr-only">Toggle mobile menu</span>
                        <i className="icon-bars" />
                    </button>
                    <Link to={PATHS.HOME} className="logo">
                        <img
                            src="/assets/images/logo.svg"
                            alt="Molla Logo"
                            width={160}
                        />
                    </Link>
                </div>
                <nav className="main-nav">
                    <MenuStyle className="menu">
                        <li>
                            <NavLink to="./">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.ABOUT}>About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.PRODUCT}>Product</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.BLOG}>Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
                        </li>
                    </MenuStyle>
                </nav>
                <div className="header-right">
                    <HeaderSearch />
                    <HeaderCardDropDown {...headerMiddleProps} />
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddle;
