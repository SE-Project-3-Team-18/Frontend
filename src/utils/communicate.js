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

const signUp = async (body) => {
  const url = new URL("/api/auth/signUp", baseUrl).toString();
  const response = await axios.post(url, body);
  return response.data;
};

const signIn = async (body) => {
  const url = new URL("/api/auth/signIn", baseUrl).toString();
  const response = await axios.post(url, body);
  return response.data;
};

const activate = async (body) => {
  const url = new URL("/api/auth/activate", baseUrl).toString();
  const response = await axios.post(url, body);
  return response.data;
};

const profile = async () => {
  console.log(config());
  const url = new URL("/api/profile", baseUrl).toString();
  const response = await axios.get(url, config());
  return response.data;
};

const getAllProducts = () => {
  const url = new URL("/api/product/all", baseUrl).toString();
  const request = axios.get(url, config());
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const getProductById = (id) => {
  const url = new URL(`/api/product/${id}`, baseUrl).toString();
  const request = axios.get(url, config());
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const createProduct = (newObject) => {
  const url = new URL("/api/product/add", baseUrl).toString();
  const request = axios.post(url, newObject, config());
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const updateProduct = (id, newObject) => {
  const url = new URL(`/api/product/update/${id}`, baseUrl).toString();
  const request = axios.put(url, newObject, config());
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const filterProduct = (newObject) => {
  const category = newObject.category;
  const url = new URL(`/api/product/filter/${category}`, baseUrl).toString();
  const request = axios.get(url, config());
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const buyProduct = (id, newObject) => {
  const url = new URL(`/api/product/buy/${id}`, baseUrl).toString();
  const request = axios.put(url, newObject, config());
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const refundProduct = (id, newObject) => {
  const url = new URL(`/api/product/refund/${id}`, baseUrl).toString();
  const request = axios.put(url, newObject, config());
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const addToCart = async (id) => {
  const baseUrl = "http://localhost:3000";
  const url = new URL(`/api/cart/add/${id}`, baseUrl).toString();
  const response = await axios.post(url,{},config());
  return response.data;
};

const getCart = async () => {
  const url = new URL("/api/cart/view", baseUrl).toString();
  const response = await axios.get(url, config());
  return response.data
};

const clearCart = async () => {
  const url = new URL("/api/cart/clear", baseUrl).toString();
  const response = await axios.delete(url,config());
  // add third paramter
  return response.data
};

const decrementCartItembyId = async (id) => {
  const url = new URL(`/api/cart/decrement/${id}`, baseUrl).toString();
  const response = await axios.put(url,{},config());
  return response.data
};

const removeCartItembyId = async (id) => {
  const url = new URL(`/api/cart/remove-item/${id}`, baseUrl).toString();
  const response = await axios.delete(url,config());
  return response.data
};

const handleCheckout = async () => {
  try {
    const url = new URL('/api/payment/checkout', baseUrl).toString()
    const response = await axios.post(url,{},config())
    return response.data
  } catch (error) {
    console.log(error)
  }
};

export const serverFunctions = {
  resetToken,
  setToken,
  signUp,
  signIn,
  activate,
  profile,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  filterProduct,
  buyProduct,
  refundProduct,
  addToCart,
  getCart,
  clearCart,
  decrementCartItembyId,
  removeCartItembyId,
  handleCheckout
};
