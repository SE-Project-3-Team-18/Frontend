import axios from "axios";
const baseUrl = "http://localhost:3000";

let token = window.localStorage.getItem("InstaCommerce:user") || null;

const resetToken = () => {
  token = null;
  return;
};

const config = () => {
  return {
    headers: { Authorization: token },
  };
};

const setToken = (user) => {
  if (user === null) {
    token = null;
    return;
  }
  token = `${user.token}`;
};

const addToCart = async (id) => {
    const url = new URL(`/api/cart/add/${id}`, baseUrl).toString();
    const response = await axios.post(url, config());
    return response.data
  };

const getCart = async () => {
    const url = new URL("/api/cart/view", baseUrl).toString();
    const response = await axios.get(url, config());
    return response.data
  };

const clearCart = async () => {
    const url = new URL("/api/cart/clear", baseUrl).toString();
    const response = await axios.delete(url, config());
    return response.data
  };

const decrementCartItembyId = async (id) => {
    const url = new URL(`/api/cart/decrement/${id}`, baseUrl).toString();
    const response = await axios.put(url, config());
    return response.data
  };

  const removeCartItembyId = async (id) => {
    const url = new URL(`/api/cart/remove-item/${id}`, baseUrl).toString();
    const response = await axios.delete(url, config());
    return response.data
  };

  export const serverFunctions = {
    resetToken,
    setToken,
    addToCart,
    getCart,
    clearCart,
    decrementCartItembyId,
    removeCartItembyId,
};
