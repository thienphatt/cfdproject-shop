import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./constants/paths";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";

function App() {
  return (
    <BrowserRouter>
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
