import React, { useState } from 'react';
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
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { serverFunctions } from '../utils/communicate';
import NotifyContext from '../context/NotifyContext';
import { redirect } from 'react-router-dom';

export default function SignUp() {
  const { Notify } = React.useContext(NotifyContext)

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate field
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = value.length === 0 ? 'Name is required' : '';
        break;
      case 'email':
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
        break;
      case 'password':
        error = value.length < 6 ? 'Password must be at least 6 characters long' : '';
        break;
      case 'confirmPassword':
        error = value !== formData.password ? 'Passwords do not match' : '';
        break;
      case 'age':
        error = isNaN(value) ? 'Age must be a number' : '';
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

    // Check for any remaining validation errors
    let formValid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        formValid = false;
      }
    });

    if (!formValid) {
      console.error('Form has validation errors');
    }

    try {
      const res = await serverFunctions
      .signUp(formData)
      Notify({
        type: 'success',
        message: `${res.message}`
      })
      setLoading(false);
      // redirect('/sign-in')
    } catch (e) {
      Notify({
        type: 'error',
        message: `${e.response?.data?.message}`
      })
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                error={errors.email}
                helperText={errors.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password}
                helperText={errors.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.age}
                helperText={errors.age}
                required
                fullWidth
                type="number"
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                inputProps={{ min: 0 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={errors.gender !== ''}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  autoComplete="gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="agree" color="primary" />}
                label="I agree to T&C."
              />
            </Grid>
          </Grid>
          <Button disabled={loading === true} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {
              loading === true ?
              <CircularProgress />:
              "Sign Up"
            }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
