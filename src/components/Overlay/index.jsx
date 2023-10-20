import React from "react";
import { useDispatch } from "react-redux";
import { handleCloesNavbar } from "../../store/reducers/mainreducer";

const Overlay = () => {
  // const { handleCloesNavbar } = useMainContext();
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(handleCloesNavbar())}
      className="mobile-menu-overlay"
    />
  );
};

export default Overlay;
