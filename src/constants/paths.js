const BLOG_PATH = "/blog";
const PRODUCT_PATH = "/products";

export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:blogSlug",
  },
  CARD: "/card",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout_success",
  CONTACT: "/contact",
  PROFILE: "/profile",
  FAQ: "/FAQ",
  PAYMENMETHOD: "/paymentmethod",
  PRIVACY_POLICY: "/privacy",
  PRODUCT_PATH: {
    INDEX: PRODUCT_PATH,
    DETAIL: PRODUCT_PATH + "/:productSlug",
  },
  RETURN: "/return",
  SHIPPING: "/shipping",
};
