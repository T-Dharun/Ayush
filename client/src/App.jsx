import { Route, Routes } from "react-router-dom";
import { GovernWorkspace } from "./pages";
import { CompanyDetails, Guide } from "./components/index";
import { ChakraProvider } from '@chakra-ui/react';
import LandingPage from './pages/LandingPage';
import Bot from './pages/bot';
import Login from "./components/Login/login";
import { Home } from './pages';
import { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "./services/authService";

const App = () => {
  const API_URL = 'http://localhost:5000/api/auth';
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log("stored User:", storedUser);

      if (storedUser && storedUser.token) {
        try {
          const response = await axios.get(`${API_URL}/verifyToken`, {
            headers: {
              Authorization: `x-auth-token ${storedUser.token}`,
            },
          });

          setUser(storedUser);
        } catch (error) {
          console.error('Invalid token, logging out', error);
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/register" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bot" element={<Bot />} />
        <Route path='/guide' element={<Guide />} />
        <Route path='/government' element={<GovernWorkspace />} />
        <Route path='/startupView/:startupId' element={<CompanyDetails />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
