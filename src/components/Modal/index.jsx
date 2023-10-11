import React, { useState } from "react";
import { useAuthContext } from "../../context/Authcontext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { MODAL_TYPE } from "../../constants/general";

const Modal = () => {
  const { handleClosedModal, isShowModal, modalTyle, setModalTyle } =
    useAuthContext();

  return (
    <>
      <div
        style={{
          opacity: isShowModal ? 1 : 0,
          visibility: isShowModal ? "visible" : "hidden",
          display: "block",
          transition: 0.3,

          zIndex: 1000,
        }}
        className="modal fade"
        id="signin-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ transform: "none" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClosedModal}
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          modalTyle === "login" ? "active" : ""
                        } `}
                        onClick={() => {
                          setModalTyle(MODAL_TYPE.login);
                        }}
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          modalTyle === "register" ? "active" : ""
                        } `}
                        onClick={() => {
                          setModalTyle(MODAL_TYPE.register);
                        }}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    {modalTyle === "login" && <LoginForm />}
                    {/* .End .tab-pane */}
                    {modalTyle === "register" && <RegisterForm />}
                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .\form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
        <div
          onClick={() =>
            // e.stopPropagation();
            handleClosedModal()
          }
          className="modal-backdrop fade show"
          style={{
            opacity: isShowModal ? 0.9 : 0,
            visibility: isShowModal ? "visible" : "hidden",
            display: "block",
            zIndex: -1,
          }}
        ></div>
      </div>
    </>
  );
};

export default Modal;
