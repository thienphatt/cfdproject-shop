import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MenuMobile from "../../components/MenuMobile";
import Modal from "../../components/Modal";
import Overlay from "../../components/Overlay";
import { useDispatch } from "react-redux";

const MainLayout = () => {
    const { pathname } = useLocation();
    const dispath = useDispatch();
    useEffect(() => {
        // Khi đổi PATH sẽ tự động scroll Top
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    return (
        <>
            <div className="page-wrapper">
                <Header />
                <Outlet />
                <Footer />
            </div>
            <BackToTop />
            <Overlay />
            <MenuMobile />
            <Modal />
        </>
    );
};

export default MainLayout;
