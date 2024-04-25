import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
  Rating,
} from "@mui/material";
import { serverFunctions } from "../utils/communicate";

export default function Product() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [productRatings, setProductRatings] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const received_data = await serverFunctions.getAllProducts();
      console.log("received data", received_data);
      setData(received_data);
      setProducts(received_data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRating = async (productId) => {
    try {
      const response = await serverFunctions.getRating(productId);
      return response;
    } catch (error) {
      console.error("Error fetching rating:", error);
      return null;
    }
  };

  const fetchRatings = async () => {
    const ratings = {};
    for (const product of products) {
      const ratingInfo = await getRating(product._id);
      ratings[product._id] = ratingInfo;
    }
    setProductRatings(ratings);
  };

  useEffect(() => {
    fetchRatings();
  }, [products]);

  const renderRating = (productId) => {
    const ratingInfo = productRatings[productId];
    if (!ratingInfo) return "No rating";

    return (
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="text.secondary" marginRight={1}>
          <b>{ratingInfo.averageRating.toFixed(2)} ({ratingInfo.totalRatings})</b>
        </Typography>
        <Rating
          value={ratingInfo.averageRating}
          precision={0.1}
          readOnly
          max={5}
          sx={{ color: "#ffc107" }} 
        />
      </Box>
    );
  };

  const handleAddToCart = async (product) => {
    try {
      const received_data = await serverFunctions.addToCart(product._id);
      console.log("received data", received_data);
    } catch (error) {
      console.log(error);
    }
  };

  const url = "https://www.mattsenkumar.com/wp-content/uploads/2021/01/ecom.jpg";

  return (
    <div className="home-container">
      {!loading ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <img src={url} alt={product.name} />
                  <div className="details">
                    <span className="price">${product.price}</span>
                    <span className="quantity">Quantity: {product.quantity}</span>
                  </div>
                  {renderRating(product._id)}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    style={{ marginTop: 10 }}
                  >
                    Add To Cart
                  </Button>
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