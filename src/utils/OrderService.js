import axios from "axios";
const baseUrl = "http://localhost:4242";

let token = window.localStorage.getItem("Greddit:token") || null;

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

const getAllOrders = async () => {
    const url = new URL("/api/order/all", baseUrl).toString();
    const response = await axios.get(url, config());
    return response.data
  };
  
const getOrderById = async (id) => {
    const url = new URL(`/api/order/${id}`, baseUrl).toString();
    const response = await axios.get(url, config());
    return response.data
};

const cancelOrder = async (id) => {
    const url = new URL(`/api/order/${id}`,baseUrl).toString();
    const response = await axios.post(url, config());
    return response.data
};

export const orderService = {
    resetToken,
    setToken,
    getAllOrders,
    getOrderById,
    cancelOrder,
};