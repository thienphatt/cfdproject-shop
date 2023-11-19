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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { message } from "antd";
import { handleGetProfile } from "./store/reducers/authReducer";
import { handleGetCart } from "./store/reducers/cartReducer";
import tokenMethod from "./utils/token";
import CardPage from "./pages/CardPage";
import CheckoutPage from "./pages/CheckoutPage";
import TestPage from "./pages/testPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        // antd message config
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

                    {/* Cart page */}
                    <Route path={PATHS.CARD} element={<CardPage />} />

                    {/* {check out} */}

                    <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />

                    {/* FAQ page */}
                    <Route path={PATHS.FAQ} element={<FAQPage />} />

                    {/* Payment Method Page */}
                    <Route
                        path={PATHS.PAYMEN_METHOD}
                        element={<PaymentMethodPage />}
                    />

                    {/* Privacy Policy Page */}
                    <Route path={PATHS.PRIVACY_POLICY} />

                    {/* Product Page */}
                    <Route
                        path={PATHS.PRODUCT}
                        element={<ProductPage />}
                    ></Route>
                    <Route
                        path={PATHS.PRODUCT_DETAIL}
                        element={<ProductDetailPage />}
                    />

                    {/* Return Page */}
                    <Route path={PATHS.RETURN} element={<ReturnsPage />} />

                    {/* Shipping Page */}
                    <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

                    {/* {Dashboard} */}
                    <Route path={PATHS.DASHBOARD} element={<DashboardPage />} />

                    {/* Private Route */}

                    {/* 404 Page */}
                    <Route path="*" element={<Page404 />} />

                    <Route path="test" element={<TestPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
