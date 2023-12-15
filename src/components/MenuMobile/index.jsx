import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { MenuStyle } from "../styled-components";

const menuTab = {
    menu: "menu",
    cate: "categories",
};

const MenuMobile = () => {
    const [tabMenu, setTabMenu] = useState(menuTab.menu);
    const dispatch = useDispatch();
    return (
        <div className="mobile-menu-container">
            <div className="mobile-menu-wrapper">
                <span
                    className="mobile-menu-close"
                    onClick={() => dispatch(handleCloesNavbar())}
                >
                    <i className="icon-close" />
                </span>
                <form action="#" method="get" className="mobile-search">
                    <label htmlFor="mobile-search" className="sr-only">
                        Search
                    </label>
                    <input
                        type="search"
                        className="form-control"
                        name="mobile-search"
                        id="mobile-search"
                        placeholder="Search in..."
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        <i className="icon-search" />
                    </button>
                </form>
                <ul
                    className="nav nav-pills-mobile nav-border-anim"
                    role="tablist"
                >
                    <li className="nav-item">
                        <a
                            className={`nav-link ${
                                tabMenu === menuTab.menu ? "active" : ""
                            }`}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setTabMenu(menuTab.menu);
                            }}
                        >
                            Menu
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${
                                tabMenu === menuTab.cate ? "active" : ""
                            }`}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setTabMenu(menuTab.cate);
                            }}
                        >
                            Categories
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    {tabMenu === menuTab.menu ? (
                        <div className="tab-pane fade show active">
                            <nav className="mobile-nav">
                                <MenuStyle className="mobile-menu">
                                    <li>
                                        <NavLink to={PATHS.HOME}>Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={PATHS.ABOUT}>
                                            About Us
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={PATHS.PRODUCT}>
                                            Product
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={PATHS.BLOG}>Blog</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={PATHS.CONTACT}>
                                            Contact Us
                                        </NavLink>
                                    </li>
                                </MenuStyle>
                            </nav>
                            {/* End .mobile-nav */}
                        </div>
                    ) : (
                        <div className="tab-pane fade show active">
                            <nav className="mobile-cats-nav">
                                <ul className="mobile-cats-menu">
                                    <li>
                                        <a
                                            className="mobile-cats-lead"
                                            href="#"
                                        >
                                            TV
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Computers</a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Tablets &amp; Cell Phones
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Smartwatches</a>
                                    </li>
                                    <li>
                                        <a href="#">Accessories</a>
                                    </li>
                                </ul>
                                {/* End .mobile-cats-menu */}
                            </nav>
                            {/* End .mobile-cats-nav */}
                        </div>
                    )}
                </div>
                {/* End .tab-content */}
                <div className="social-icons">
                    <a
                        href="#"
                        className="social-icon"
                        target="_blank"
                        title="Facebook"
                    >
                        <i className="icon-facebook-f" />
                    </a>
                    <a
                        href="#"
                        className="social-icon"
                        target="_blank"
                        title="Twitter"
                    >
                        <i className="icon-twitter" />
                    </a>
                    <a
                        href="#"
                        className="social-icon"
                        target="_blank"
                        title="Instagram"
                    >
                        <i className="icon-instagram" />
                    </a>
                    <a
                        href="#"
                        className="social-icon"
                        target="_blank"
                        title="Youtube"
                    >
                        <i className="icon-youtube" />
                    </a>
                </div>
                {/* End .social-icons */}
            </div>
            {/* End .mobile-menu-wrapper */}
        </div>
    );
};

export default MenuMobile;
