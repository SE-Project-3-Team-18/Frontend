import axios from "axios";
const baseUrl = "http://localhost:3007";

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
  
  const createProduct = newObject => {
    const url = new URL("/api/product/add",baseUrl).toString();
    const request = axios.post(url, newObject, config());
    return request
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };
  
  const updateProduct = (id,newObject) => {
    const url = new URL(`/api/product/update/${id}`,baseUrl).toString();
    const request = axios.put(url, newObject, config());
    return request
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
  
  const filterProduct = newObject => {
    const category = newObject.category;
    const url = new URL(`/api/product/filter/${category}`,baseUrl).toString();
    const request = axios.get(url, config());
    return request
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
  
  const buyProduct = (id,newObject) => {
    const url = new URL(`/api/product/buy/${id}`, baseUrl).toString();
    const request = axios.put(url,newObject,config());
    return request
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };
  
  const refundProduct = (id,newObject) => {
    const url = new URL(`/api/product/refund/${id}`,baseUrl).toString();
    const request = axios.put(url, newObject, config());
    return request
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  export const serverFunctions = {
    resetToken,
    setToken,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    filterProduct,
    buyProduct,
    refundProduct
  };