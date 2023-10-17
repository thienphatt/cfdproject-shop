import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MODAL_TYPE } from "../../constants/general";
import { PATHS } from "../../constants/paths";
import { useAuthContext } from "../../context/Authcontext";
import {
  handleLogout,
  handleShowModal,
} from "../../store/reducers/authReducer";
import tokenMethod from "../../utils/token";

const HeaderTop = () => {
  const { profile } = useAuthContext();
  const dispatch = useDispatch();
  const { firstName, whiteList, email } = profile || {};
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
                    onClick={() => {
                      dispatch(handleShowModal());
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
                    onClick={() => {
                      handleShowModal(MODAL_TYPE.register);
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
                <a href="#" className="top-link-menu">
                  <i className="icon-user" />
                  {email}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.PROFILE}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE}>Your Orders</Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE}>
                          Wishlist <span>({whiteList?.length})</span>
                        </Link>
                      </li>
                      <li>
                        <a
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(handleLogout());
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
