import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import Overlay from "../../components/Overlay";
import MenuMobile from "../../components/MenuMobile";
import Modal from "../../components/Modal";
import { Outlet } from "react-router-dom";
import MainContextProvider from "../../context/MainContext";
import AuthContextProvider from "../../context/Authcontext";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <div className="page-wrapper">
          <Header />
          <Outlet />
          <Footer />
        </div>
        <BackToTop />
        {/* Mobile Menu */}
        <Overlay />
        {/* End .mobil-menu-overlay */}
        <MenuMobile />
        {/* End .mobile-menu-container */}
        {/* Sign in / Register Modal */}
        <Modal />
        {/* End .modal */}
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
