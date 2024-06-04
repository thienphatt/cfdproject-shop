import { message } from "antd";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import { PATHS } from "./constants/paths";
import MainLayout from "./layout/MainLayout";
import { handleGetProfile } from "./store/reducers/authReducer";
import { handleGetCart } from "./store/reducers/cartReducer";
import tokenMethod from "./utils/token";
import useDebounce from "./hook/useDebounce";
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const BlogSinglePage = React.lazy(() => import("./pages/BlogSinglePage"));
const CardPage = React.lazy(() => import("./pages/CardPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const Address = React.lazy(() => import("./pages/DashboardPage/Address"));
const Order = React.lazy(() => import("./pages/DashboardPage/Order"));
const WishList = React.lazy(() => import("./pages/DashboardPage/WishList"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const PaymentMethodPage = React.lazy(() => import("./pages/PaymentMethodPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const ReturnsPage = React.lazy(() => import("./pages/ReturnsPage"));
const ShippingPage = React.lazy(() => import("./pages/ShippingPage"));
const TestPage = React.lazy(() => import("./pages/testPage"));
const HomePgae = React.lazy(() => import("./pages/HomePage"));
const CheckoutSuccessPage = React.lazy(() =>
  import("./pages/CheckoutSuccessPage")
);
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const AccountDetail = React.lazy(() =>
  import("./pages/DashboardPage/AccountDetail")
);

function App() {
  const dispatch = useDispatch();
  // test git

  useEffect(() => {
    // antd message config to below the background
    message.config({
      top: 80,
      duration: 3,
      maxCount: 3,
    });

    if (tokenMethod.get()) {
      // handleGetProfile
      dispatch(handleGetProfile());

      //get cart
      dispatch(handleGetCart());
    }
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<MainLayout />}>
            {/* HOMEPAGE */}
            <Route index element={<HomePgae />} />

            {/* AboutPage */}
            <Route path={PATHS.ABOUT} element={<AboutPage />} />

            {/* Blog Page */}
            <Route path={PATHS.BLOG} element={<BlogPage />} />

            {/* Blog Detail Page */}
            <Route path={PATHS.BLOG_DETAIL} element={<BlogSinglePage />} />

            {/* Contact Page */}
            <Route path={PATHS.CONTACT} element={<ContactPage />} />

            {/* Cart page */}
            <Route path={PATHS.CARD} element={<CardPage />} />

            {/* {check out} */}
            <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />

            {/* {check out} */}
            <Route
              path={PATHS.CHECKOUT_SUCCESS}
              element={<CheckoutSuccessPage />}
            />

            {/* FAQ page */}
            <Route path={PATHS.FAQ} element={<FAQPage />} />

            {/* Payment Method Page */}
            <Route path={PATHS.PAYMEN_METHOD} element={<PaymentMethodPage />} />

            {/* Privacy Policy Page */}
            <Route path={PATHS.PRIVACY_POLICY} />

            {/* Product Page */}
            <Route path={PATHS.PRODUCT} element={<ProductPage />}></Route>
            <Route
              path={PATHS.PRODUCT_DETAIL}
              element={<ProductDetailPage />}
            />

            {/* Return Page */}
            <Route path={PATHS.RETURN} element={<ReturnsPage />} />

            {/* Shipping Page */}
            <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

            {/* {Dashboard} */}
            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.DASHBOARD} element={<DashboardPage />}>
                <Route index end element={<AccountDetail />} />
                <Route path={PATHS.PROFILE.ORDER} element={<Order />} />
                <Route path={PATHS.PROFILE.ADDRESS} element={<Address />} />
                <Route path={PATHS.PROFILE.WISHLIST} element={<WishList />} />
              </Route>
            </Route>

            {/* Private Route */}

            {/* 404 Page */}
            <Route path="*" element={<Page404 />} />

            <Route path="test" element={<TestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
export default App;
