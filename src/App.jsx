import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/paths";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import CardPage from "./pages/CardPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import DashboardPage from "./pages/DashboardPage";
import FAQPage from "./pages/FAQPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import { ConfigProvider } from "antd";

function App() {
  return (
    <BrowserRouter>
      {/* <ConfigProvider
        theme={{
          components: {
            Message: {
              zIndexPopup: 1100,
              zIndexBase: 1100,
              zIndexPopupBase: 1100,
            },
          },
        }}
      > */}
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          {/* HOMEPAGE */}
          <Route index element={<HomePage />} />

          {/* AboutPage */}
          <Route path={PATHS.ABOUT} element={<AboutPage />} />

          {/* Blog Page */}
          <Route path={PATHS.BLOG.INDEX} element={<BlogPage />}>
            <Route path={PATHS.BLOG.DETAIL} element={<BlogSinglePage />} />
          </Route>

          {/* Contact Page */}
          <Route path={PATHS.CONTACT} element={<ContactPage />} />

          {/* FAQ page */}
          <Route path={PATHS.FAQ} element={<FAQPage />} />

          {/* Payment Method Page */}
          <Route path={PATHS.PAYMENMETHOD} element={<PaymentMethodPage />} />

          {/* Privacy Policy Page */}
          <Route path={PATHS.PRIVACY_POLICY} />

          {/* Product Page */}
          <Route path={PATHS.PRODUCT_PATH.INDEX} element={<ProductPage />}>
            <Route
              path={PATHS.PRODUCT_PATH.DETAIL}
              element={<ProductDetailPage />}
            />
          </Route>

          {/* Return Page */}
          <Route path={PATHS.RETURN} element={<ReturnsPage />} />

          {/* Shipping Page */}
          <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

          {/* Private Route */}
          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.CARD} element={<CardPage />} />
            <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
            <Route
              path={PATHS.CHECKOUT_SUCCESS}
              element={<CheckoutSuccessPage />}
            />
            <Route path={PATHS.PROFILE} element={<DashboardPage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      {/* </ConfigProvider> */}
    </BrowserRouter>
  );
}

export default App;
