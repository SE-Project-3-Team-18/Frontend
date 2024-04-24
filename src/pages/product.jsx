import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { serverFunctions } from "../utils/communicate";
import { redirect } from "react-router-dom";

export default function Product() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const received_data = await serverFunctions.getAllProducts();
        console.log("received data",received_data)
        setData(received_data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    const fetchData = async () => {
        try {
          const received_data = await serverFunctions.addToCart(product._id);
          console.log("received data", received_data);
        } catch (error) {
          console.log(error);
        }
      };
    fetchData(); 
  };
  
  const url = "https://www.mattsenkumar.com/wp-content/uploads/2021/01/ecom.jpg"
  return (
    <div className="home-container">
      {!loading ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <img src={url} alt={product.name} />
                  <div className="details">
                    <span className="price">${product.price}</span>
                    <span className="quantity">Quantity: {product.quantity}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
