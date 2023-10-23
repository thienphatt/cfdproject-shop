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
