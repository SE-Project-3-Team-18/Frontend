import React, { useState } from "react";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { serverFunctions } from "../utils/communicate";
import { redirect } from "react-router-dom";
import NotifyContext from '../context/NotifyContext';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const { Notify } = React.useContext(NotifyContext)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        error = value.length === 0 ? "Name is required" : "";
        break;
      case "description":
        error = value.length === 0 ? "Description is required" : "";
        break;
      case "category":
        error = value.length === 0 ? "Category is required" : "";
        break;
      case "quantity":
        error = isNaN(value) && value >= 0 ? "Quantity must be a number" : "";
        break;
      case "price":
        error = isNaN(value) && value >= 0 ? "Price must be a number" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let formValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        formValid = false;
      }
    });
    if (!formValid) {
      console.error("Form has validation errors");
    }
    try {
      const FormData = { ...formData, sellerId: "sellerID" };
      console.log("FormData",FormData);
      const res = await serverFunctions.createProduct(FormData);
      Notify({
        type: "success",
        message: `${res.message}`,
      });
      setLoading(false);
    } catch (e) {
      Notify({
        type: "error",
        message: `${e.response?.data?.message}`,
      });
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddCircleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Product
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errors.name}
                helperText={errors.name}
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.description}
                helperText={errors.description}
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.category}
                helperText={errors.category}
                required
                fullWidth
                name="category"
                label="Category"
                id="category"
                autoComplete="category"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.price}
                helperText={errors.price}
                required
                fullWidth
                type="number"
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                inputProps={{ min: 0 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.quantity}
                helperText={errors.quantity}
                required
                fullWidth
                type="number"
                id="quantity"
                label="Quantity"
                name="quantity"
                autoComplete="quantity"
                inputProps={{ min: 0 }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading === true}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading === true ? <CircularProgress /> : "Create New Item"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
