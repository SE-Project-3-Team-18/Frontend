import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp';
import NotifyContext from './context/NotifyContext';
import NotifyPane from './components/Notify';
import UserContext from './context/UserContext';
import { CircularProgress, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import NavBar from './components/Navbar';
import { serverFunctions } from './utils/communicate';
import Profile from './pages/profile';

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

  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem('InstaCommerce:user'))
    // console.log(saved)
    if (saved) {
      serverFunctions.setToken(saved)
      setUser(saved)
      setLoading(false)
    }
  }, [])


  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : LightTheme}>
      <CssBaseline />
      <UserContext.Provider value={{ user, setUser }}>
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
                      </>
                      :
                      <>
                        <Route exact path="/profile" Component={Profile}></Route>
                        <Route exact path='/welcome' Component={() => <div>Hello</div>}></Route>
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
