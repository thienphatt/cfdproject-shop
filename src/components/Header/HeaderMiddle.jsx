import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import useHeaderMiddle from "../../hook/useHeaderMiddle";
import { handleShowNavbar } from "../../store/reducers/mainreducer";
import { MenuStyle } from "../styled-components";
import HeaderSearch from "./HeaderSearch";
import HeaderCardDropDown from "../CartDropDown";

const HeaderMiddle = () => {
    const { isShowNavbar } = useSelector((state) => state.main);
    const dispath = useDispatch();

    const { headerMiddleProps } = useHeaderMiddle();

    useEffect(() => {
        if (isShowNavbar) {
            $("body").addClass("mmenu-active");
            $("mobile-menu-toggler").addClass("active");
        } else {
            $("body").removeClass("mmenu-active");
            $("mobile-menu-toggler").removeClass("active");
        }
    }, [isShowNavbar]);

    const _toggleMenu = (e) => {
        e?.stopPropagation();
        dispath(handleShowNavbar());
    };

    return (
        <div className="header-middle sticky-header">
            <div className="container">
                <div className="header-left">
                    <button
                        onClick={_toggleMenu}
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
