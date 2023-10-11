import React from "react";
import { useMainContext } from "../../context/MainContext";

const Overlay = () => {
  const { handleCloesNavbar } = useMainContext();
  return <div onClick={handleCloesNavbar} className="mobile-menu-overlay" />;
};

export default Overlay;
