import { CircularProgress, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import NavBar from './components/Navbar';
import NotifyPane from './components/Notify';
import NotifyContext from './context/NotifyContext';
import UserContext from './context/UserContext';
import Activate from './pages/activate';
import Cart from './pages/cart';
import CheckoutFailure from './pages/checkout-cancel';
import CheckoutSuccess from './pages/checkout-success';
import Item from './pages/item';
import NotificationPage from './pages/notifications';
import OrdersPage from './pages/orders';
import Product from './pages/product';
import Profile from './pages/profile';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import UpgradeToSeller from './pages/upgradeToSeller';
import { serverFunctions } from './utils/communicate';
import SingleOrderPage from './pages/singleOrder';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LightTheme = createTheme()

function App() {
  const [notification, Notify] = useState();
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light')
  const [loading, setLoading] = useState(true)

  const logout = () => {
    setLoading(true)
    serverFunctions.resetToken()
    window.localStorage.removeItem('InstaCommerce:user')
    setUser(null)
    setLoading(false)
  }

  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem('InstaCommerce:user'))
    // console.log(saved)
    if (saved) {
      serverFunctions.setToken(saved)
      setUser(saved)
      setLoading(false)

      // console.log(window.location.href.endsWith)
      if (
        saved.activated === false &&
        window.location.href.endsWith('/activate') === false
      ) {
        window.location.href = '/activate'
      }
    } else {
      setLoading(false)
    }
  }, [])


  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : LightTheme}>
      <CssBaseline />
      <UserContext.Provider value={{ user, setUser, logout }}>
        <NotifyContext.Provider value={{ notification, Notify }}>
          <BrowserRouter>
            <NotifyPane></NotifyPane>
            <NavBar theme={theme} setTheme={setTheme}></NavBar>
            {
              loading ?
                <CircularProgress /> :
                <Routes>
                  {
                    user === null ?
                      <>
                        <Route exact path="/sign-in" Component={SignIn}></Route>
                        <Route exact path="/sign-up" Component={SignUp}></Route>
                        <Route path="*" element={<Navigate replace to="/sign-in"/>} /> 
                      </>
                      :
                      <>
                        <Route exact path='/activate' Component={Activate}></Route>
                        <Route exact path="/profile" Component={Profile}></Route>
                        <Route exact path="/notifications" Component={NotificationPage}></Route>
                        <Route exact path="/upgrade-to-seller" Component={UpgradeToSeller}></Route>
                        <Route exact path="/product" Component={Product}></Route>
                        <Route exact path="/create-item" Component={Item}></Route>
                        <Route exact path="/orders" Component={OrdersPage}></Route>
                        <Route exact path="/orders/:id" Component={SingleOrderPage}></Route>
                        <Route exact path="/checkout-success" Component={CheckoutSuccess}></Route>
                        <Route exact path="/checkout-cancel" Component={CheckoutFailure}></Route>
                        <Route exact path="/cart" Component={Cart}></Route>
                        <Route path="*" element={<Navigate replace to="/profile"/>} /> 
                      </>
                  }
                </Routes>
            }
          </BrowserRouter>
        </NotifyContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
