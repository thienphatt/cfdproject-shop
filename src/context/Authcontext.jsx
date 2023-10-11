import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import tokenMethod from "../utils/token";
import { MODAL_TYPE } from "../constants/general";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [profile, setProfile] = useState();

  const [modalTyle, setModalTyle] = useState(MODAL_TYPE.login);

  useEffect(() => {
    if (tokenMethod.get()) {
      // call api get profile
      handleGetProfile();
    }
  }, []);

  const handleShowModal = (modalTyle) => {
    setModalTyle(modalTyle);
    const $body = $("body");
    $body.toggleClass("modal-open");
    setIsShowModal(true);
  };

  const handleClosedModal = () => {
    setIsShowModal(false);
    const $body = $("body");
    $body.removeClass("modal-open");
  };

  const handleLogin = async (loginData, callback) => {
    const payload = { ...loginData };
    try {
      const res = await authService.login(payload);
      console.log("res", res);
      if (res?.data?.data) {
        // Tạo biến riêng thể hiện thông tin token
        const { token: accessToken, refreshToken } = res.data.data || {};

        // lưu token vào cookie
        tokenMethod.set({
          accessToken,
          refreshToken,
        });
        handleGetProfile();
        handleClosedModal();
        message.success("Đăng nhập thành công");
      } else {
        message.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.log("error", error);
      message.error("Sai thông tin");
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    message.error("Đăng ký thất bại");

    const payload = {
      firstName: registerData.name || "",
      lastName: "",
      email: registerData.email,
      password: registerData.password,
    };

    try {
      const res = await authService.register(payload);
      console.log("res", res);
      if (res?.data?.data?.id) {
        // thành công
        message.success("đăng ký thành công");
      } else {
        message.error("Đăng ký thất bại");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      callback?.();
    }
  };

  const handleLogout = () => {
    tokenMethod.remove();
    setProfile();
    message.success("Tài khoản đã đăng xuát");
  };

  // lấy profile từ token
  const handleGetProfile = async () => {
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        handleClosedModal,
        handleShowModal,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetProfile,
        setModalTyle,
        isShowModal,
        modalTyle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
