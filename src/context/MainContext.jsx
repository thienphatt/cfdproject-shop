// import { createContext, useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const MainContext = createContext({});

// const MainContextProvider = ({ children }) => {
//   const [isShowNavbar, setIsShowNavbar] = useState(false);
//   const { pathname } = useLocation();

//   console.log("pathname", pathname);

//   useEffect(() => {
//     // Khi đổi PATH sẽ tự động scroll Top
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });
//     setIsShowNavbar(false);
//   }, [pathname]);

//   const handleShowNavbar = () => {
//     setIsShowNavbar(true);
//   };

//   const handleCloesNavbar = () => {
//     setIsShowNavbar(false);
//   };

//   return (
//     <MainContext.Provider
//       value={{ isShowNavbar, handleShowNavbar, handleCloesNavbar }}
//     >
//       {children}
//     </MainContext.Provider>
//   );
// };

// export default MainContextProvider;

// export const useMainContext = () => useContext(MainContext);
