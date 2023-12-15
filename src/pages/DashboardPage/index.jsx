import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ANTMESSAGE } from "../../constants/messageConfig";
import { PATHS } from "../../constants/paths";
import { handleLogout } from "../../store/reducers/authReducer";
import { clearCar } from "../../store/reducers/cartReducer";
import { message } from "antd";
import Breadcrumb from "../../components/Breadcrumb";
import useDashboardPage from "./useDashboardPage";

const DashboardPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { accountProps } = useDashboardPage();

    const _onSignOut = (e) => {
        e?.preventDefault();
        dispatch(handleLogout());
        dispatch(clearCar());
        message.success(ANTMESSAGE.logOutMessage);
        navigate(PATHS.HOME);
    };

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{
                    backgroundImage: 'url("/assets/images/page-header-bg.jpg")',
                }}
            >
                <div className="container">
                    <h1 className="page-title">My Account</h1>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={"/"}>HOME</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>My Account</Breadcrumb.Item>
            </Breadcrumb>
            <div className="page-content">
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <aside className="col-md-4 col-lg-3">
                                <ul
                                    className="nav nav-dashboard flex-column mb-3 mb-md-0"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <NavLink
                                            end
                                            className="nav-link"
                                            to={PATHS.PROFILE.INDEX}
                                        >
                                            Account Details
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to={PATHS.PROFILE.ORDER}
                                        >
                                            Orders
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to={PATHS.PROFILE.ADDRESS}
                                        >
                                            Adresses
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to={PATHS.PROFILE.WISHLIST}
                                        >
                                            Wishlist
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            href="#"
                                            onClick={(e) => _onSignOut(e)}
                                        >
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </aside>
                            <div className="col-md-8 col-lg-9">
                                <div className="tab-content">
                                    <Outlet {...accountProps} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
