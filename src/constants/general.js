export const MODAL_TYPE = {
    login: "login",
    register: "register",
};

export const TABS = {
    featured: "Featured",
    on_sale: "On Sale",
    top_rated: "Top Rated",
};

export const SORT_OPTIONS = {
    popularity: {
        value: "popularity",
        label: "Most Popular",
        queryObject: {
            orderBy: undefined,
            order: undefined,
        },
    },
    pricelow: {
        value: "pricelow",
        label: "Price low to High",
        queryObject: {
            orderBy: "price",
            order: "1",
        },
    },
    pricehigh: {
        value: "pricehigh",
        label: "Price high to low",
        queryObject: {
            orderBy: "price",
            order: "-1",
        },
    },
    newest: {
        value: "newest",
        label: "Newest",
        queryObject: {
            orderBy: "creatAt",
            order: "-1",
        },
    },
    rating: {
        value: "rating",
        label: "Most Rated",
        queryObject: {
            orderBy: "rating",
            order: "-1",
        },
    },
};

export const SHIPPING_OPTIONS = [
    {
        value: "free",
        label: "Free Shipping",
        price: 0,
    },
    {
        value: "standart",
        label: "Standart",
        price: 10,
    },
    {
        value: "express",
        label: "Express",
        price: 20,
    },
];

export const PAYMENT_METHOD = {
    cash: "cash",
    bank: "bank",
};
