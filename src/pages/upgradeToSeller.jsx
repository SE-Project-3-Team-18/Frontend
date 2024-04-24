import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { serverFunctions } from '../utils/communicate';
import NotifyContext from '../context/NotifyContext';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UpgradeToSeller() {
  const navigate = useNavigate()
  const { Notify } = React.useContext(NotifyContext)
  const { logout } = React.useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      companyName: data.get('companyName'),
      phoneNo: data.get('phoneNo'),
      address: data.get('address'),
      pinCode: data.get('pinCode'),
    }

    try {
      const result = await serverFunctions
        .registerForSeller(body)

      logout()
      navigate('/sign-in')
      Notify({
        type: 'success',
        message: `${result.message}`
      })
    } catch (e) {
      console.log('Error:', e)
      Notify({
        type: 'error',
        message: `${e.response?.data?.message}`
      })
      // setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            <CurrencyRupeeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Upgrade to Seller
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              autoComplete="companyName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phoneNo"
              label="Phone No"
              type="phoneNo"
              id="phoneNo"
              autoComplete="phoneNo"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              autoComplete="address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pinCode"
              label="PIN Code"
              type="pinCode"
              id="pinCode"
              autoComplete="pinCode"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}