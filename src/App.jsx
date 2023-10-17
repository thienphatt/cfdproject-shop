import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { PATHS } from "./constants/paths";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import CardPage from "./pages/CardPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import FAQPage from "./pages/FAQPage";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./store/action/counterAction";
import { useEffect } from "react";
import { fetchDog } from "./store/action/dogAction";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  // khơi chạy dispatch fectRamdomdog 1 lần
  useEffect(() => {
    dispatch(fetchDog());
  }, []);

  const dog = useSelector((state) => state.dog);

  return (
    <BrowserRouter>
      {/* {
        <div>
          <h1>counter: {counter}</h1>
          <button onClick={() => dispatch(increment(10))}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
      }

      {
        <div>
          {dog?.message ? (
            <img src={dog.message} atl="" />
          ) : (
            <p>Không tìm thấy ảnh cún nào!</p>
          )}
        </div>
      } */}

      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          {/* HOMEPAGE */}
          <Route index element={<HomePage />} />

          {/* AboutPage */}
          <Route path={PATHS.ABOUT} element={<AboutPage />} />

          {/* Blog Page */}
          <Route path={PATHS.BLOG} element={<BlogPage />}></Route>

          {/* Contact Page */}
          <Route path={PATHS.CONTACT} element={<ContactPage />} />

          {/* FAQ page */}
          <Route path={PATHS.FAQ} element={<FAQPage />} />

          {/* Payment Method Page */}
          <Route path={PATHS.PAYMEN_METHOD} element={<PaymentMethodPage />} />

          {/* Privacy Policy Page */}
          <Route path={PATHS.PRIVACY_POLICY} />

          {/* Product Page */}
          <Route path={PATHS.PRODUCT} element={<ProductPage />}></Route>
          <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetailPage />} />

          {/* Return Page */}
          <Route path={PATHS.RETURN} element={<ReturnsPage />} />

          {/* Shipping Page */}
          <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

          {/* Private Route */}

          {/* 404 Page */}
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
