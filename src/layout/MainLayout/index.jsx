import React from "react";
import { Outlet } from "react-router-dom";
import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MenuMobile from "../../components/MenuMobile";
import Modal from "../../components/Modal";
import Overlay from "../../components/Overlay";

const MainLayout = () => {
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   // Khi đổi PATH sẽ tự động scroll Top
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // }, [pathname]);

  return (
    <>
      {/* <MainContextProvider> */}
      {/* <AuthContextProvider> */}
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
      {/* </AuthContextProvider> */}
      // {/* </MainContextProvider> */}
    </>
  );
};

export default MainLayout;
