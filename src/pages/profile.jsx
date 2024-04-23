import React, { useEffect, useState } from 'react';
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

export default function Profile() {
  const { Notify } = React.useContext(NotifyContext)

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(undefined);

  useEffect(() => {
    console.log("Inside")
    serverFunctions
      .profile()
      .then((res) => {
        setData(res.details)
      })
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {
        data === undefined ?
          <CircularProgress /> :
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {data.name[0]}
            </Avatar>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    defaultValue={data.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    defaultValue={data.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="age"
                    inputProps={{ min: 0 }}
                    defaultValue={data.age}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      autoComplete="gender"
                      defaultValue={data.gender}
                      disabled
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Box>
      }
    </Container>
  );
}
