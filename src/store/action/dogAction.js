export const updateDog = (payload) => {
  return {
    type: "UPDATE_DOG",
    payload,
  };
};

export const fetchDog = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      if (data?.status === "success") {
        dispatch(updateDog(data));
      } else {
        throw "error";
      }
    } catch (error) {
      dispatch(updateDog(null));
    }
  };
};
