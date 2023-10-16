export const increment = function (payload) {
  return {
    type: "INCREMENT",
    payload: payload || 1,
  };
};

export const decrement = function (payload) {
  return {
    type: "DECREMENT",
    payload: payload || 1,
  };
};
