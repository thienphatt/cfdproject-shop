const PRODUCT_PATH = "/products";
const PROFILE_PATH = "/dashboard";
const PROFILE_ORDER = "/dashboard/order";
const PROFILE_ADDRESS = "/dashboard/address";
const PROFILE_WISHLIST = "/dashboard/wishlist";

export const PATHS = {
    HOME: "/",
    PRODUCT: PRODUCT_PATH,
    PRODUCT_DETAIL: PRODUCT_PATH + "/:slug",
    CARD: "/card",
    CHECKOUT: "/checkout",
    CHECKOUT_SUCCESS: "/checkout_success",
    DASHBOARD: "/dashboard",
    FAQ: "/FAQ",
    PAYMEN_METHOD: "/paymentmethod",
    PRIVACY_POLICY: "/privacy",
    RETURN: "/return",
    SHIPPING: "/shipping",
    PROFILE: {
        INDEX: PROFILE_PATH,
        ORDER: PROFILE_ORDER,
        ADDRESS: PROFILE_ADDRESS,
        WISHLIST: PROFILE_WISHLIST,
    },
    ABOUT: "/about",
    BLOG: "/blog",
    CONTACT: "/contact",
};
