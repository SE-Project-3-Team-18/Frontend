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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { serverFunctions } from '../utils/communicate';
import NotifyContext from '../context/NotifyContext';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Activate() {
  const navigate = useNavigate()
  const { Notify } = React.useContext(NotifyContext)
  const { user, setUser } = React.useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: user.email,
      otp: data.get('otp'),
    }

    try {
      await serverFunctions
        .activate(body)
      Notify({
        type: 'success',
        message: 'Activation Successfull'
      })
      window.localStorage.clear('InstaCommerce:user')
      navigate('/sign-in')
      // setLoading(false);
      // redirect('/sign-in')
    } catch (e) {
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Activation
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="otp"
              label="OTP"
              type="otp"
              id="otp"
              autoComplete="current-otp"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Activate
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}