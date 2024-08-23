import { Route, Routes } from "react-router-dom";
import { GovernWorkspace } from "./pages";
import { CompanyDetails, Guide } from "./components/index";
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import LandingPage from './pages/LandingPage';
import Bot from './pages/bot';
import Login from "./components/Login/login";
import { Home } from './pages';
import { useAuth } from './services/AuthContext';
import { useEffect,useState } from "react";
import axiosHeader from "./axiosHeader";
import AddClerk from "./components/government/AddClerk";
const App = () => {
  const [data, setData] = useState(null);
  const { user, loading } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHeader.get('auth/me');
        localStorage.setItem('data', JSON.stringify(response.data));
        console.log(response.data); // Log the data to see the response
        setData(response.data); // Store the data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <Spinner size="xl" />; // Show a loading spinner or placeholder
  }

  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/register" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {user && (
          <>
            <Route path="/bot" element={<Bot />} />
            <Route path='/guide' element={<Guide />} />
            <Route path='/government' element={<GovernWorkspace />} />
            <Route path='/government/create' element={<AddClerk />} />
            <Route path='/startupView/:startupId' element={<CompanyDetails />} />
          </>
        )}
      </Routes>
    </ChakraProvider>
  );
}

export default App;
